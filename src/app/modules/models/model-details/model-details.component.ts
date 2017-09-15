import { Component, OnInit } from '@angular/core';
import { HttpModelsService } from '@services/http-models.service';
import { HttpWeightedServicesService } from '@shared/services/http-weighted-services.service';
import { HttpModelRuntimeService } from '@shared/services/http-model-runtime.service';
import { ActivatedRoute } from '@angular/router';
import { DialogModelBuildComponent, injectableModelOptions } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';
import { DialogStopModelComponent, injectableModelStopOptions } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import { DialogDeleteServiceComponent, injectableServiceOptions } from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';
import { DialogDeployModelComponent, injectableModelDeployOptions } from '@components/dialogs/dialog-deploy-model/dialog-deploy-model.component';
import { MdlDialogService } from '@angular-mdl/core';
import { ModelStore } from '@stores/model.store';
import { WeightedServiceStore } from '@shared/stores/weighted-service.store';
import { ModelServiceStore } from '@shared/stores/model-service.store';
import { Model } from '@models/model';
import { WeightedService } from '@models/weighted-service';
import { ModelService } from '@models/model-service';
import { ModelRuntime } from '@models/model-runtime.ts';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';


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
  private weightedServices: WeightedService[];
  public deployable = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private modelsService: HttpModelsService,
    private modelRuntimeService: HttpModelRuntimeService,
    private weightedServicesService: HttpWeightedServicesService,
    private dialog: MdlDialogService,
    private modelStore: ModelStore,
    private weightedServiceStore: WeightedServiceStore,
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
    this.modelServiceStore.getAll();
    this.modelServiceStore.items
    .subscribe((data) => {
      this.modelServices = data;
    });
    this.weightedServicesService.getAll()
      .subscribe((data) => {
        this.weightedServices = data;
      });

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
        this.deployable = this.isDeployable();
      });
  }

  public getModelService(modelRuntimeId: number): ModelService {
    return this.modelServices.find((modelService) => modelService.modelRuntime.id === modelRuntimeId);
  }

  public getWeightedServices(modelRuntimeId: number): String[] {
    const modelService = this.getModelService(modelRuntimeId);
    if (!modelRuntimeId || !modelService) {
      return [''];
    }
    return this.weightedServices.filter((weightedService) => {
      return weightedService.weights.some((weight) => weight.serviceId === modelService.serviceId);
    }).map((weightedService) => weightedService.serviceName);
  }

  public isDeployable() {
    if (!this.model || !this.model.lastModelRuntime.created) {
      return true;
    }
    const modelUpdated = this.model.updated;
    const runtimeCreated = this.model.lastModelRuntime.created;
    return moment(modelUpdated).isAfter(moment(runtimeCreated));
  }

  public getPayloadForModelDeploy(runtime) {
    return {serviceName: `${runtime.modelName}_${runtime.modelVersion}`, modelRuntimeId: runtime.id};
  }

  buildModel(modelOptions) {
    this.dialog.showCustomDialog({
      component: DialogModelBuildComponent,
      styles: { 'width': '800px', 'min-height': '350px' },
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{ provide: injectableModelOptions, useValue: modelOptions }],
    });
  }

  deployModelService(modelOptions) {
    this.dialog.showCustomDialog({
      component: DialogDeployModelComponent,
      styles: { 'width': '800px', 'min-height': '350px' },
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{ provide: injectableModelDeployOptions, useValue: modelOptions }],
    });
  }

  testModel(model) {
    this.dialog.showCustomDialog({
      component: DialogTestComponent,
      styles: { 'width': '800px', 'min-height': '350px' },
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{ provide: injectableModelBuildOptions, useValue: model }],
    });
  }

  stopModel(modelService) {
    this.dialog.showCustomDialog({
      component: DialogStopModelComponent,
      styles: { 'width': '600px', 'min-height': '250px' },
      classes: '',
      isModal: true,
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400,
      providers: [{ provide: injectableModelStopOptions, useValue: modelService }],
    });
  }

}
