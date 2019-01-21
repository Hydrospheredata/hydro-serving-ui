
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as HydroActions from '@applications/actions/applications.actions';
import * as fromApplications from '@applications/reducers';
import { HydroServingState } from '@core/reducers';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { ApplicationsService, ApplicationsBuilderService } from '@applications/services';
import { Application } from '@shared/models/_index';

import { MdlSnackbarService } from '@angular-mdl/core';
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
                            this.router.navigate(['/applications', response.id]);
                            return new HydroActions.AddApplicationSuccessAction(new Application(response));
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
                            return new HydroActions.UpdateApplicationSuccessAction(new Application(response));
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
            map((action: HydroActions.DeleteApplicationAction) => action.applicationId),
            switchMap(applicationId => {
                return this.applicationsService
                    .deleteApplication(applicationId)
                    .pipe(
                        map(() => {
                            this.router.navigate(['applications']);
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Application has been deleted',
                                timeout: 5000,
                            });
                            return (new HydroActions.DeleteApplicationSuccessAction(applicationId));
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
                this.store.select(fromApplications.getSelectedApplicationSignatureName),
                this.store.select(fromApplications.getSelectedApplicationId)
            ),
            switchMap(([action, signatureName, applicationId]) => {
                console.log(action, applicationId);
                return this.applicationsService.generateInputs(applicationId, encodeURIComponent(signatureName))
                    .pipe(
                        map(input => {
                            const payload = { id: applicationId, input: JSON.stringify(input, undefined, 2) };
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
                this.store.select(fromApplications.getSelectedApplicationId)
            ),
            switchMap(([action, applicationId]) => {
                return observableOf(new HydroActions.SetInputSuccessAction({ id: applicationId, input: action }));
            })
        );

    @Effect() testApplication$: Observable<Action> = this.actions$
        .ofType(HydroActions.ApplicationActionTypes.Test)
        .pipe(
            withLatestFrom(
                this.store.select(fromApplications.getSelectedApplicationInput),
                this.store.select(fromApplications.getSelectedApplicationSignatureName),
                this.store.select(fromApplications.getSelectedApplication)
            ),
            switchMap(([action, inputs, signatureName, application]) => {
                console.log(action, inputs);
                return this.applicationsService
                        .serveService(
                            JSON.parse(inputs),
                            application.name,
                            encodeURIComponent(application.signature.signatureName)
                        )
                        .pipe(
                            map(output => {
                                return new HydroActions.TestApplicationSuccessAction({
                                    id: application.id,
                                    output: JSON.stringify(output, undefined, 2),
                                });
                            }),
                            catchError(error => {
                                const payload = {id: application.id, error};
                                return observableOf(new HydroActions.TestApplicationFailAction(payload));
                            })
                        );
            })
        );

    constructor(
        private actions$: Actions,
        private router: Router,
        private applicationsService: ApplicationsService,
        private applicationBuilder: ApplicationsBuilderService,
        private mdlSnackbarService: MdlSnackbarService,
        private store: Store<HydroServingState>
    ) {
    }
}
