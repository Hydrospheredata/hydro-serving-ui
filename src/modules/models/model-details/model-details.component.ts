import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { 
  HttpModelsService, 
  HttpWeightedServicesService,
  HttpModelRuntimeService,
  ModelRuntimesService, 
  ModelServicesService, 
  ServicesService
} from '@shared/services/_index';


import { 
  DialogModelBuildComponent,
  DialogDeployModelComponent,
  DialogTestComponent,
  DialogStopModelComponent,
  injectableModelOptions,
  injectableModelDeployOptions,
  injectableModelStopOptions,
  injectableModelBuildOptions
} from '@components/dialogs/_index';

import { MdlDialogService } from '@angular-mdl/core';
import { ModelStore, WeightedServiceStore, ModelServiceStore } from '@shared/stores/_index';

import * as moment from 'moment';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { AppState, Model, WeightedService } from '@shared/models/_index';
import {  } from '@shared/services/_index';
import { Subscription } from 'rxjs/Subscription';
import * as Actions from '@shared/actions/_index';
import { ModelsService, ModelService, ModelRuntime } from '@shared/_index';


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
        console.warn('PARAMS CHANGE')
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



    this.modelsService.getBuildsByModel(id).first()
      .subscribe((data) => {
        this.builds = data.sort((a, b) => {
          return moment(b.started).diff(moment(a.started));
        });
      });

    this.modelsStoreSelectionSubscription = this.store.select('models')
      .subscribe(models => {
        console.warn('MODELS CHANGE')
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

  testModel(model: ModelService) {
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

  stopModel(modelService, modelRuntimes) {
    if (modelRuntimes.length > 0) {
      this.dialog.alert('Model can\'t be stopped while it is used in service.');
    } else {
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

  ngOnDestroy() {
  }

}
