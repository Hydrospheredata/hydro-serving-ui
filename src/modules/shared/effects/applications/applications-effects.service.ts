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
            return this.applicationsService.getApplications().take(1)
                .map((applications: Application[]) => {
                    let data = applications.map(app => this.applicationBuilder.build(app));
                    return ({ type: HydroActions.GET_APPLICATIONS_SUCCESS, payload: data });
                });
        });

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