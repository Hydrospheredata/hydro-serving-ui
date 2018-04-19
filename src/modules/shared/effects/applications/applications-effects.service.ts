import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ApplicationBuilder } from '@shared/builders/_index';
import { ApplicationsService } from '@shared/services/_index';
import { Application } from '@shared/models/_index';
import * as HydroActions from '@shared/actions/_index';
import { switchMap, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { MdlSnackbarService } from '@angular-mdl/core';



@Injectable()
export class ApplicationsEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private applicationsService: ApplicationsService,
        private applicationBuilder: ApplicationBuilder,
        private mdlSnackbarService: MdlSnackbarService
    ) { }

    @Effect() getServices$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.Get)
        .pipe(
            switchMap(() => {
                return this.applicationsService
                    .getApplications()
                    .pipe(
                        map((apps: Application[]) => {
                            const data = apps.map(app => this.applicationBuilder.build(app));
                            return (new HydroActions.GetApplicationsSuccessAction(data));
                        }),
                        catchError(error => Observable.of(new HydroActions.GetApplicationsFailAction(error)))
                    );
            })
        );

    @Effect() deleteApplication$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.Delete)
        .pipe(
            map((action: HydroActions.DeleteApplicationAction) => action.applicationId),
            switchMap(applicationId => {
                return this.applicationsService
                    .deleteApplication(applicationId)
                    .pipe(
                        map(() => {
                            this.router.navigate(['applications']);
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Application has been deleted',
                                timeout: 5000
                            });
                            return (new HydroActions.DeleteApplicationSuccessAction(applicationId));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000
                            });
                            return Observable.of(new HydroActions.DeleteApplicationFailAction(error));
                        })
                    );
            })
        );
}
