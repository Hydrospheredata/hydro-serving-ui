import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ApplicationBuilder } from '@shared/builders/_index';
import { ApplicationsService } from '@shared/services/_index';
import { Application } from '@shared/models/_index';
import * as HydroActions from '@shared/actions/_index';

@Injectable()
export class ApplicationsEffects {

    @Effect() getServices$: Observable<Action> = this.actions.ofType(HydroActions.GET_APPLICATIONS)
        .switchMap(() => {
            return this.applicationsService.getServices().take(1)
                .map((applications: Application[]) => {
                    let data = applications.map(app => this.applicationBuilder.build(app));
                    return ({ type: HydroActions.GET_APPLICATIONS_SUCCESS, payload: data });
                });
        });

    // @Effect() addService$: Observable<Action> = this.actions.ofType(HydroActions.ADD_SERVICE)
    //     .map((action: HydroActions.AddServiceAction) => action.payload)
    //     .switchMap(payload => {
    //         return this.applicationsService.addService(payload)
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
    //         return this.applicationsService.updateService(payload)
    //             .map((service: Service) => {
    //                 return ({ type: HydroActions.UPDATE_SERVICE_SUCCESS, payload: new Service(service) })
    //             })
    //     });

    @Effect() deleteApplication$: Observable<Action> = this.actions.ofType(HydroActions.DELETE_APPLICATION)
        .map((action: HydroActions.DeleteApplicationAction) => action.applicationId)
        .switchMap(applicationId => {
            return this.applicationsService.deleteApplication(applicationId)
                .map(() => {
                    return ({ type: HydroActions.DELETE_APPLICATION_SUCCESS, applicationId: applicationId });
                });
        });

    constructor(
        private actions: Actions,
        private applicationsService: ApplicationsService,
        private applicationBuilder: ApplicationBuilder
    ) {}
}