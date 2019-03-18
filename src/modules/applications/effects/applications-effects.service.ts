
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as HydroActions from '@applications/actions/applications.actions';
import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { ApplicationsService } from '@applications/services';
import { Application } from '@shared/models/_index';

import { MdlSnackbarService } from '@angular-mdl/core';
import { ApplicationBuilder } from '@core/builders/application.builder';
import {of as observableOf,  Observable } from 'rxjs';
import { switchMap, catchError, withLatestFrom, skip ,  map } from 'rxjs/operators';

@Injectable()
export class ApplicationsEffects {

    @Effect() getApplications$: Observable<Action> = this.actions$
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
                        catchError(error => observableOf(new HydroActions.GetApplicationsFailAction(error)))
                    );
            })
        );

    @Effect() addApplication$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.Add)
        .pipe(
            map((action: HydroActions.AddApplicationAction) => action.application),
            switchMap(application => {
                return this.applicationsService.addApplication(application)
                    .pipe(
                        map(response => {
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Application was successfully added',
                                timeout: 5000,
                            });
                            this.router.navigate(['/applications', response.name]);

                            const app = this.applicationBuilder.build(response);
                            return new HydroActions.AddApplicationSuccessAction(app);
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000,
                            });
                            return observableOf(new HydroActions.AddApplicationFailAction(error));
                        })
                    );
            })
        );

    @Effect() updateApplication$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.Update)
        .pipe(
            map((action: HydroActions.UpdateApplicationAction) => action.application),
            switchMap(application => {
                return this.applicationsService.updateApplication(application)
                    .pipe(
                        map(response => {
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Application was successfully updated',
                                timeout: 5000,
                            });
                            const app = this.applicationBuilder.build(response);
                            return new HydroActions.UpdateApplicationSuccessAction(app);
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000,
                            });
                            return observableOf(new HydroActions.UpdateApplicationFailAction(error));
                        })
                    );
            })
        );

    @Effect() deleteApplication$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.Delete)
        .pipe(
            map((action: HydroActions.DeleteApplicationAction) => action.application),
            switchMap(({ name }) => {
                return this.applicationsService
                    .deleteApplication(name)
                    .pipe(
                        map(() => {
                            this.router.navigate(['applications']);
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Application has been deleted',
                                timeout: 5000,
                            });
                            return (new HydroActions.DeleteApplicationSuccessAction(name));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000,
                            });
                            return observableOf(new HydroActions.DeleteApplicationFailAction(error));
                        })
                    );
            })
        );

    @Effect() generateInputs$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.GenerateInput)
        .pipe(
            withLatestFrom(
                this.store.select(fromApplications.getSelectedApplication)
            ),
            switchMap(([action, { name: applicationName }]) => {
                console.log(action, applicationName);
                return this.applicationsService.generateInputs(applicationName)
                    .pipe(
                        map(input => {
                            const payload = { name: applicationName, input: JSON.stringify(input, undefined, 2) };
                            return new HydroActions.GenerateInputSuccessAction(payload);
                        }),
                        catchError(error => {
                            return observableOf(new HydroActions.GenerateInputFailAction(error));
                        })
                    );
            })
        );

    @Effect() setInputs$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.SetInput)
        .pipe(
            skip(1),
            map((action: HydroActions.SetInputAction) => action.payload),
            withLatestFrom(
                this.store.select(fromApplications.getSelectedApplication)
            ),
            switchMap(([action, { name }]) => {
                return observableOf(new HydroActions.SetInputSuccessAction({ name, input: action }));
            })
        );

    @Effect() testApplication$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.Test)
        .pipe(
            withLatestFrom(
                this.store.select(fromApplications.getSelectedApplicationInput),
                this.store.select(fromApplications.getSelectedApplication)
            ),
            switchMap(([action, inputs, application]) => {
                console.log(action, inputs);
                return this.applicationsService
                        .serveService(
                            JSON.parse(inputs),
                            application.name
                        )
                        .pipe(
                            map(output => {
                                return new HydroActions.TestApplicationSuccessAction({
                                    name: application.name,
                                    output: JSON.stringify(output, undefined, 2),
                                });
                            }),
                            catchError(error => {
                                const payload = { name: application.name, error };
                                return observableOf(new HydroActions.TestApplicationFailAction(payload));
                            })
                        );
            })
        );

    constructor(
        private actions$: Actions,
        private router: Router,
        private applicationsService: ApplicationsService,
        private applicationBuilder: ApplicationBuilder,
        private mdlSnackbarService: MdlSnackbarService,
        private store: Store<HydroServingState>
    ) {
    }
}
