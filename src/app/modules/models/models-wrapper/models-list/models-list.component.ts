import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModelStore } from '@shared/stores/_index';
import { HttpRuntimeTypesService } from '@shared/services/_index';
import { DialogModelBuildComponent, injectableModelOptions } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import {
  DialogTestComponent,
  injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';
import {
  DialogStopModelComponent,
  injectableModelStopOptions } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import {
  DialogDeleteServiceComponent,
  injectableServiceOptions } from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';
import { MdlDialogService } from '@angular-mdl/core';
import { ActivatedRoute } from '@angular/router';
import { ModelServiceStore } from '@shared/stores/_index';
import { WeightedServiceStore } from '@shared/stores/_index';
import { Observable } from 'rxjs/Observable';

import { ModelsService, Model } from '@shared/_index';
import { Store } from '@ngrx/store';
import { AppState, RuntimeType, WeightedService } from '@shared/models/_index';

@Component({
  selector: 'hydro-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class ModelsListComponent implements OnInit {
  public models: Model[];
  public runtimeTypes: RuntimeType[];
  private activatedRouteSub: any;
  public id: string;

  constructor(
    private store: Store<AppState>,
    private modelStore: ModelStore,
    private httpRuntimeTypesService: HttpRuntimeTypesService,
    public dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute,
    private modelServiceStore: ModelServiceStore,
    private weightedServiceStore: WeightedServiceStore,
  ) {
  }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .map((params) => {
        this.id = params['modelId'];
        return this.id;
      })
      .subscribe(() => { this.loadInitialData(); });

    this.httpRuntimeTypesService.getAll().subscribe((runtimeType) => {
      this.runtimeTypes = runtimeType;
    });
  }

  loadInitialData() {
    this.store.select('models')
    .subscribe(models => {
        this.models = models;
    });
  }

  buildModel(modelOptions, event) {
    event.stopPropagation();
    this.dialog.showCustomDialog({
      component: DialogModelBuildComponent,
      styles: {'width': '800px', 'min-height': '350px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableModelOptions, useValue: modelOptions}],
    });
  }

  testModel(model: Model, event) {
    event.stopPropagation();
    this.dialog.showCustomDialog({
      component: DialogTestComponent,
      styles: {'width': '800px', 'min-height': '350px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableModelBuildOptions, useValue: model}],
    });
  }

  stopModel(model, event) {
    event.stopPropagation();
    this.dialog.showCustomDialog({
      component: DialogStopModelComponent,
      styles: {'width': '600px', 'min-height': '250px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableModelStopOptions, useValue: model}],
    });
  }

  deleteWeightedService(id, event) {
    event.stopPropagation();
    this.dialog.showCustomDialog({
      component: DialogDeleteServiceComponent,
      styles: {'width': '600px', 'min-height': '250px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableServiceOptions, useValue: id}],
    });
  }

}
