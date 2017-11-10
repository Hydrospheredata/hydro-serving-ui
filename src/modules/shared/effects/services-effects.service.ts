import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ServiceBuilder, ModelBuilder } from '@shared/builders/_index';

import { ServicesService, ModelsService } from '@shared/services/_index';
import { AppState, Service, ModelService } from '@shared/models/_index';
import * as HydroActions from '@shared/actions/_index';

@Injectable()
export class ServicesEffects {

    @Effect() getServices$: Observable<Action> = this.actions.ofType(HydroActions.GET_SERVICES)
        .switchMap(action => {
            return this.servicesService.getServices().take(1)
                .map((services: Service[]) => {
                    let data = services.map(service => this.serviceBuilder.build(service));
                    return ({ type: HydroActions.GET_SERVICES_SUCCESS, payload: data })
                })
        });

    @Effect() deleteService$: Observable<Action> = this.actions.ofType(HydroActions.DELETE_SERVICE)
        .map((action: HydroActions.DeleteServiceAction) => action.applicationId)
        .switchMap(applicationId => {
            return this.servicesService.deleteService(applicationId)
                .map(() => {
                    return ({ type: HydroActions.DELETE_SERVICE_SUCCESS, applicationId: applicationId })
                })
        });

    constructor(
        private actions: Actions,
        private servicesService: ServicesService,
        private modelsService: ModelsService,
        private serviceBuilder: ServiceBuilder,
        private modelBuilder: ModelBuilder,
    ) {}
}