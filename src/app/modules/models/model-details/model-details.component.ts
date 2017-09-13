import { Component, OnInit } from '@angular/core';
import { HttpModelsService } from '@services/http-models.service';
import { HttpModelRuntimeService } from '@shared/services/http-model-runtime.service';
import { ActivatedRoute } from '@angular/router';
import { DialogModelBuildComponent, injectableModelOptions } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';
import { DialogStopModelComponent, injectableModelStopOptions } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { DialogDeleteServiceComponent, injectableServiceOptions } from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';
import { MdlDialogService } from '@angular-mdl/core';
import { ModelStore } from '@stores/model.store';
import { ModelServiceStore } from '@shared/stores/model-service.store';
import { Model } from '@models/model';
import { ModelService } from '@models/model-service';
import { ModelRuntime } from '@models/model-runtime.ts';
import * as moment from 'moment';


@Component({
  selector: 'hydro-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit {

  private activatedRouteSub: any;
  public id: string;
  public builds: any;
  public model: Model;
  public runtimes: ModelRuntime[];
  private modelServices: ModelService[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private modelsService: HttpModelsService,
    private modelRuntimeService: HttpModelRuntimeService,
    private dialog: MdlDialogService,
    private modelStore: ModelStore,
    private modelServiceStore: ModelServiceStore
  ) { }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .map((params) => {
        this.id = params['modelId'];
        return this.id;
      })
      .subscribe((modelId) => {
        this.loadInitialData(modelId);
      });
  }

  loadInitialData(id: string) {
    this.modelsService.getBuildsByModel(id)
      .subscribe((data) => {
        this.builds = data.sort((a, b) => {
          return moment(b.started).diff(moment(a.started));
        });
      });

      this.modelRuntimeService.getRuntimeByModel(Number(id), 1000)
        .subscribe((data: ModelRuntime[]) => {
          this.runtimes = data;
      });
    // TODO: PROPERLY GET BUILDS OR MOVE THEM TO STORE
    this.modelStore.items
      .subscribe((items) => {
        this.model = items.find((dataStoreItem) => dataStoreItem.id === Number(this.id));
        // this.modelsService.getBuildsByModel(id)
        // .subscribe((data) => {
        //   this.builds = data.sort((a, b) => {
        //     return moment(b.started).diff(moment(a.started));
        //   });
        // });
      });

    this.modelServiceStore.getAll();
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

}
