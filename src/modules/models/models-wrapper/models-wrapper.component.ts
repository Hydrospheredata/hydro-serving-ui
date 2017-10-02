import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { AppState, Model } from '@shared/models/_index';
import { ModelBuilder } from '@shared/builders/_index';
import * as Actions from '@shared/actions/_index';
import { ModelsService, ModelServicesService, ServicesService } from '@shared/services/_index';
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

  private data: Model[];
  private sidebarTitle: string = 'Models';
  private models: any;

  constructor(
      private modelBuilder: ModelBuilder,
      private store: Store<AppState>,
      private modelsService: ModelsService,
      private servicesService: ServicesService,
      private modelServicesService: ModelServicesService
  ) {
      this.modelsServiceSubscription = this.modelsService.getModels().first()
          .subscribe(models => {
              this.data = models.map(this.modelBuilder.build, this.modelBuilder);
              this.store.dispatch({ type: Actions.GET_MODELS, payload: this.data });
          });
      this.models = this.store.select('models');
  }

  ngOnDestroy() {
  }
}
