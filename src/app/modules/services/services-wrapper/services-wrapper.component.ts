import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';
import { ServicesService, ModelServicesService } from '@shared/services/_index';
import { ServiceBuilder } from '@shared/builders/_index';



@Component({
  selector: 'hydro-services-wrapper',
  templateUrl: './services-wrapper.component.html',
  styleUrls: ['./services-wrapper.component.scss']
})

export class ServicesWrapperComponent implements OnDestroy {

    private servicesServiceSubscription: Subscription;
    private modelServicesServiceSubscription: Subscription;

    constructor(
        private store: Store<AppState>,
        private servicesService: ServicesService,
        private modelServicesService: ModelServicesService,
        private serviceBuilder: ServiceBuilder
    ) {
        this.servicesServiceSubscription = this.servicesService.getServices()
            .subscribe(services => {
                this.store.dispatch({ type: Actions.GET_SERVICES, payload: services.map(service => this.serviceBuilder.build(service)) });
            });
        this.modelServicesServiceSubscription = this.modelServicesService.getModelServices()
            .map(serviceModels => serviceModels.filter(model => model.serviceId > 0))
            .subscribe(serviceModels => {
                this.store.dispatch({ type: Actions.GET_MODEL_SERVICE, payload: serviceModels });
            });
    }

    ngOnDestroy() {
        this.servicesServiceSubscription.unsubscribe();
        this.modelServicesServiceSubscription.unsubscribe();
    }


}
