import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModelStore } from '@stores/model.store';
import { BuildModelService } from '@services/build-model.service';
import { Model } from '@models/model';
import { HttpRuntimeTypesService } from '@services/http-runtime-types.service';
import { RuntimeType } from '@models/runtime-type';
import { DialogModelBuildComponent, injectableModelOptions } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestModelComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test-model/dialog-test-model.component';
import { DialogStopModelComponent, injectableModelStopOptions } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { MdlDialogService } from '@angular-mdl/core';

@Component({
  selector: 'hydro-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
  providers: [BuildModelService],
  encapsulation: ViewEncapsulation.None
})
export class ModelsListComponent implements OnInit {
  public models: Model[];
  public runtimeTypes: RuntimeType[];
  public currentRuntimeType: RuntimeType;

  constructor(
    private buildModelService: BuildModelService,
    private modelStore: ModelStore,
    private httpRuntimeTypesService: HttpRuntimeTypesService,
    public dialog: MdlDialogService
  ) {
  }

  ngOnInit() {
    this.modelStore.getAll();
    this.modelStore.items.subscribe((models) => {
      this.models = models;
      console.log(models);
    });
    this.httpRuntimeTypesService.getAll().subscribe((runtimeType) => {
      this.runtimeTypes = runtimeType;
    });
  }

  buildModel(modelOptions) {
    this.dialog.showCustomDialog({
      component: DialogModelBuildComponent,
      styles: {'width': '800px', 'min-height': '50%'},
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{provide: injectableModelOptions, useValue: modelOptions}],
    });
  }

  private setModelStatus() {

  }

  testModel(model) {
    this.dialog.showCustomDialog({
      component: DialogTestModelComponent,
      styles: {'width': '800px', 'min-height': '500px'},
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
