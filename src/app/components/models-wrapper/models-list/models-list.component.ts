import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModelStore } from '@stores/model.store';
import { Model } from '@models/model';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { RuntimeType } from '@models/runtime-type';
import { DialogModelBuildComponent, injectableModelOptions } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestModelComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test-model/dialog-test-model.component';
import { DialogStopModelComponent, injectableModelStopOptions } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { MdlDialogService } from '@angular-mdl/core';
import { ActivatedRoute } from '@angular/router';
import { ModelServiceStore } from '@stores/model-service.store';

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

  constructor(
    private modelStore: ModelStore,
    private httpRuntimeTypesService: HttpRuntimeTypesService,
    public dialog: MdlDialogService,
    private activatedRoute: ActivatedRoute,
    private modelServiceStore: ModelServiceStore
  ) {
  }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .map((params) => {
        return params['modelId'];
      })
      .subscribe((modelId) => { this.loadInitialData(modelId) });


    this.httpRuntimeTypesService.getAll().subscribe((runtimeType) => {
      this.runtimeTypes = runtimeType;
    });
  }

  loadInitialData(id: string) {
    if (id === 'all') {
      this.modelStore.getAll();
      this.modelStore.items.subscribe((models) => {
        console.log(models);
        this.models = models;
      });
    } else {
      // todo set correct query
      this.modelServiceStore.getAll();
      this.modelServiceStore.items.subscribe((models) => {
        this.models = null;
      });
    }
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
      component: DialogTestModelComponent,
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

}
