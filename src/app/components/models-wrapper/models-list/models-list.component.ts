import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModelStore } from '@stores/model.store';
import { Model } from '@models/model';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { RuntimeType } from '@models/runtime-type';
import { DialogModelBuildComponent, injectableModelOptions } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';
import { DialogStopModelComponent, injectableModelStopOptions } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { DialogDeleteServiceComponent, injectableServiceOptions } from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';
import { MdlDialogService } from '@angular-mdl/core';
import { ActivatedRoute } from '@angular/router';
import { ModelServiceStore } from '@stores/model-service.store';
import { WeightedServiceStore } from '@stores/weighted-service.store';
import { Observable } from 'rxjs/Observable';
import { WeightedService } from '@models/weighted-service';
import {
  DialogWeightedServiceComponent,
  injectableWeightedService
} from '@components/dialogs/dialog-weighted-service/dialog-weighted-service.component';

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
  public weightedServices;
  public modelServices;
  public id: string;

  constructor(
    private modelStore: ModelStore,
    private httpRuntimeTypesService: HttpRuntimeTypesService,
    public dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute,
    private modelServiceStore: ModelServiceStore,
    private weightedServiceStore: WeightedServiceStore
  ) {
  }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .map((params) => {
        console.warn(params);
        this.id = params['modelId'];
        console.warn(this.id);
        return this.id;
      })
      .subscribe(() => { this.loadInitialData(); });

    this.httpRuntimeTypesService.getAll().subscribe((runtimeType) => {
      this.runtimeTypes = runtimeType;
    });
  }

  loadInitialData() {
      this.modelStore.getAll();
      this.modelStore.items.subscribe((models) => {
        console.log(models);
        this.models = models;
      });
  }

  openDialogWeightedServicesForm(service?: WeightedService) {
    this.dialog.showCustomDialog({
      component: DialogWeightedServiceComponent,
      styles: {'width': '850px', 'min-height': '250px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableWeightedService, useValue: service}],
    });
  }

  openDialogTestWeightedServicesForm(service?: WeightedService) {
    this.dialog.showCustomDialog({
      component: DialogTestComponent,
      styles: {'width': '850px', 'min-height': '250px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableModelBuildOptions, useValue: service}],
    });
  }

  buildModel(modelOptions) {
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

  testModel(model) {
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

  stopModel(id) {
    this.dialog.showCustomDialog({
      component: DialogStopModelComponent,
      styles: {'width': '600px', 'min-height': '250px'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableModelStopOptions, useValue: id}],
    });
  }

  deleteWeightedService(id) {
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
