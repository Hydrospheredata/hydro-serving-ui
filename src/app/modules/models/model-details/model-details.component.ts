import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpModelsService } from '@services/http-models.service';
import { HttpWeightedServicesService } from '@shared/services/http-weighted-services.service';
import { HttpModelRuntimeService } from '@shared/services/http-model-runtime.service';
import { ActivatedRoute } from '@angular/router';
import { DialogModelBuildComponent, injectableModelOptions } from '@components/dialogs/dialog-model-build/dialog-model-build.component';
import { DialogTestComponent, injectableModelBuildOptions } from '@components/dialogs/dialog-test/dialog-test.component';
import { DialogStopModelComponent, injectableModelStopOptions } from '@components/dialogs/dialog-stop-model/dialog-stop-model.component';
import {
  DialogDeleteServiceComponent,
  injectableServiceOptions } from '@components/dialogs/dialog-delete-service/dialog-delete-service.component';
import {
  DialogDeployModelComponent,
  injectableModelDeployOptions } from '@components/dialogs/dialog-deploy-model/dialog-deploy-model.component';
import { MdlDialogService } from '@angular-mdl/core';
import { ModelStore } from '@stores/model.store';
import { WeightedServiceStore } from '@shared/stores/weighted-service.store';
import { ModelServiceStore } from '@shared/stores/model-service.store';
import { Model } from '@models/model';
import { WeightedService } from '@models/weighted-service';
import { ModelRuntime } from '@models/model-runtime.ts';
import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/models/_index';
import { ModelRuntimesService } from '@shared/services/_index';
import { Subscription } from 'rxjs/Subscription';
import * as Actions from '@shared/actions/_index';
import { ModelsService, ModelService } from '@shared/_index';
import { ModelServicesService, ServicesService } from '@shared/services/_index';


@Component({
  selector: 'hydro-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit, OnDestroy {

  private activatedRouteSub: any;
  public id: string;
  public builds: any;
  public model: Model;
  public runtimes: ModelRuntime[];
  private modelServices: ModelService[];
  private weightedServices: WeightedService[];
  public deployable = true;

  private modelRuntimesServiceSubscription: Subscription;
  private modelServicesServiceSubscription: Subscription;
  private servicesServiceSubscription: Subscription;
  private modelsStoreSelectionSubscription: Subscription;
  private buildsSubscription: Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private modelsService: HttpModelsService,
    private modelRuntimesService: ModelRuntimesService,
    private modelRuntimeService: HttpModelRuntimeService,
    private weightedServicesService: HttpWeightedServicesService,
    private dialog: MdlDialogService,
    private modelStore: ModelStore,
    private weightedServiceStore: WeightedServiceStore,
    private modelServiceStore: ModelServiceStore,
    private store: Store<AppState>,


    private servicesService: ServicesService,
    private modelServicesService: ModelServicesService
  ) { }

  ngOnInit() {
    this.activatedRouteSub = this.activatedRoute.params
      .map((params) => {
        this.id = params['modelId'];
        return this.id;
      })
      .subscribe((modelId) => {
        if (this.modelsStoreSelectionSubscription) {
          this.modelsStoreSelectionSubscription.unsubscribe();
        }
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

      this.modelsStoreSelectionSubscription =  this.store.select('models')
      .subscribe(models => {
        this.model = models.find((dataStoreItem) => dataStoreItem.id === Number(this.id));

        this.modelRuntimesServiceSubscription = this.modelRuntimesService.getModelRuntimeByModelId(Number(id), 1000).first()
          .subscribe(modelRuntimes => {
            this.runtimes = modelRuntimes;
            this.store.dispatch({ type: Actions.GET_MODEL_RUNTIME, payload: modelRuntimes });
          });

        this.modelServicesServiceSubscription = this.modelServicesService.getModelServices().first()
          .map(modelServices => modelServices.filter(model => model.serviceId > 0))
          .subscribe(modelServices => {
            this.modelServices = modelServices;
            this.store.dispatch({ type: Actions.GET_MODEL_SERVICE, payload: modelServices });
          });


        this.servicesServiceSubscription = this.servicesService.getServices().first()
          .subscribe(services => {
            this.weightedServices = services;
            this.store.dispatch({ type: Actions.GET_SERVICES, payload: services });
          });

        this.deployable = this.isDeployable();
      });
  }

  public getModelService(modelRuntimeId: number): ModelService {
    if (!this.modelServices) {
      return null;
    }
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
    return { serviceName: `${runtime.modelName}_${runtime.modelVersion}`, modelRuntimeId: runtime.id };
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
      styles: { 'width': '800px', 'min-height': '250px' },
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

  ngOnDestroy() {
  }

}
