import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ServiceBuilder } from '@shared/builders/_index';
import { ServicesService } from '@shared/services/_index';
import { Service } from '@shared/models/_index';
import * as HydroActions from '@shared/actions/_index';

@Injectable()
export class ServicesEffects {

    @Effect() getServices$: Observable<Action> = this.actions.ofType(HydroActions.GET_SERVICES)
        .switchMap(() => {
            return this.servicesService.getServices().take(1)
                .map((services: Service[]) => {
                    let data = services.map(service => this.serviceBuilder.build(service));
                    return ({ type: HydroActions.GET_SERVICES_SUCCESS, payload: data });
                });
        });

    // @Effect() addService$: Observable<Action> = this.actions.ofType(HydroActions.ADD_SERVICE)
    //     .map((action: HydroActions.AddServiceAction) => action.payload)
    //     .switchMap(payload => {
    //         return this.servicesService.addService(payload)
    //             .map((service: Service) => {
    //                 return ({ type: HydroActions.ADD_SERVICE_SUCCESS, payload: new Service(service) });
    //             })
    //             // .catch((error) => {
    //             //     return ({ type: HydroActions.ADD_SERVICE_FAILURE, error: error })
    //             // })
    //     });

    // @Effect() updateService$: Observable<Action> = this.actions.ofType(HydroActions.UPDATE_SERVICE)
    //     .map((action: HydroActions.UpdateServiceAction) => action.payload)
    //     .switchMap(payload => {
    //         return this.servicesService.updateService(payload)
    //             .map((service: Service) => {
    //                 return ({ type: HydroActions.UPDATE_SERVICE_SUCCESS, payload: new Service(service) })
    //             })
    //     });

    @Effect() deleteService$: Observable<Action> = this.actions.ofType(HydroActions.DELETE_SERVICE)
        .map((action: HydroActions.DeleteServiceAction) => action.applicationId)
        .switchMap(applicationId => {
            return this.servicesService.deleteService(applicationId)
                .map(() => {
                    return ({ type: HydroActions.DELETE_SERVICE_SUCCESS, applicationId: applicationId });
                });
        });

    constructor(
        private actions: Actions,
        private servicesService: ServicesService,
        private serviceBuilder: ServiceBuilder
    ) {}
}