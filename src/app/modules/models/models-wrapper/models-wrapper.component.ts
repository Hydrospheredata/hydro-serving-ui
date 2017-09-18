import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {
  ModelsService,
  Model,
  GET_MODELS
} from '@shared/_index';

import { AppState } from '@shared/models/_index';
import { ModelBuilder } from '@shared/builders/_index';
import * as Actions from '@shared/actions/_index';
import { ModelServicesService, ServicesService } from '@shared/services/_index';
@Component({
  selector: 'hydro-models-wrapper',
  templateUrl: './models-wrapper.component.html',
  styleUrls: ['./models-wrapper.component.scss']
})
export class ModelsWrapperComponent implements OnDestroy {

  private modelsServiceSubscription: Subscription;
  private modelServicesServiceSubscription: Subscription;
  private modelRuntimesServiceSubscription: Subscription;
  private servicesServiceSubscription: Subscription;

  constructor(
      private modelBuilder: ModelBuilder,
      private store: Store<AppState>,
      private modelsService: ModelsService,
      private servicesService: ServicesService,
      private modelServicesService: ModelServicesService
  ) {
      this.modelsServiceSubscription = this.modelsService.getModels()
          .subscribe(models => {
              console.warn(models);
              this.store.dispatch({ type: Actions.GET_MODELS, payload: models.map(modelBuilder.build, modelBuilder) });
          });
      // this.servicesServiceSubscription = this.servicesService.getServices()
      //     .subscribe(services => {
      //         this.store.dispatch({ type: Actions.GET_SERVICES, payload: services });
      //     });
      // this.modelServicesServiceSubscription = this.modelServicesService.getModelServices()
      //     .map(serviceModels => serviceModels.filter(model => model.serviceId > 0))
      //     .subscribe(serviceModels => {
      //         this.store.dispatch({ type: Actions.GET_MODEL_SERVICE, payload: serviceModels });
      //     });
  }

  ngOnDestroy() {
      this.modelsServiceSubscription.unsubscribe();
      // this.servicesServiceSubscription.unsubscribe();
      // this.modelServicesServiceSubscription.unsubscribe();
  }



}
