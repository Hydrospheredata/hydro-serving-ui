import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ApplicationBuilder } from '@shared/builders/_index';
import { ApplicationsService } from '@shared/services/_index';
import { AppState, Application } from '@shared/models/_index';
import * as HydroActions from '@shared/actions/_index';

@Injectable()
export class ApplicationsEffects {

    @Effect() getServices$: Observable<Action> = this.actions$
        .ofType(HydroActions.GET_APPLICATIONS)
        .withLatestFrom(this.store.select('applications'))
        .switchMap(store => {
            const applications = store[1];
            if (applications.length) {
                return Observable.of({ type: HydroActions.GET_APPLICATIONS_SUCCESS, payload: [] });
            } else {
                return this.applicationsService.getApplications().take(1)
                    .map((apps: Application[]) => {
                        const data = apps.map(app => this.applicationBuilder.build(app));
                        return ({ type: HydroActions.GET_APPLICATIONS_SUCCESS, payload: data });
                    })
                    .catch(() => Observable.of({ type: HydroActions.GET_APPLICATIONS_FAIL }));
            }
        });

    @Effect() deleteApplication$: Observable<Action> = this.actions$
        .ofType(HydroActions.DELETE_APPLICATION)
        .map((action: HydroActions.DeleteApplicationAction) => action.applicationId)
        .switchMap(applicationId => {
            return this.applicationsService.deleteApplication(applicationId)
                .map(() => {
                    this.router.navigate(['applications']);
                    return ({ type: HydroActions.DELETE_APPLICATION_SUCCESS, applicationId: applicationId });
                });
        });

    constructor(
        private actions$: Actions,
        private router: Router,
        private applicationsService: ApplicationsService,
        private applicationBuilder: ApplicationBuilder,
        private store: Store<AppState>,
    ) { }
}
