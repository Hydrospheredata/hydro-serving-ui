
import {of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { ApplicationsService, ApplicationsBuilderService } from '@applications/services';
import { Application } from '@shared/models/_index';
import * as HydroActions from '@applications/actions/applications.actions';
import { switchMap, catchError, withLatestFrom, skip ,  map } from 'rxjs/operators';
import { MdlSnackbarService } from '@angular-mdl/core';
import { HydroServingState } from '@core/reducers';

import * as fromApplications from '@applications/reducers';


@Injectable()
export class ApplicationsEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private applicationsService: ApplicationsService,
        // private metricService: MetricSettingsService,
        private applicationBuilder: ApplicationsBuilderService,
        private mdlSnackbarService: MdlSnackbarService,
        private store: Store<HydroServingState>,
    ) { }

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
                                timeout: 5000
                            });
                            this.router.navigate(['/applications', response.id]);
                            return new HydroActions.AddApplicationSuccessAction(new Application(response));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000
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
                                timeout: 5000
                            });
                            return new HydroActions.UpdateApplicationSuccessAction(new Application(response));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000
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
                                timeout: 5000
                            });
                            return (new HydroActions.DeleteApplicationSuccessAction(applicationId));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000
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
                            return new HydroActions.GenerateInputSuccessAction({ id: applicationId, input: JSON.stringify(input, undefined, 2) });
                        }),
                        catchError(error => {
                            return observableOf(new HydroActions.GenerateInputFailAction(error));
                        })
                    )
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
                this.store.select(fromApplications.getSelectedApplicationId)
            ),
            switchMap(([action, inputs, signatureName, applicationId]) => {
                console.log(action, inputs);
                return this.applicationsService.serveService(JSON.parse(inputs), applicationId, encodeURIComponent(signatureName))
                    .pipe(
                        map(output => {
                            return new HydroActions.TestApplicationSuccessAction({ id: applicationId, output: JSON.stringify(output, undefined, 2) })
                        }),
                        catchError(error => {
                            return observableOf(new HydroActions.TestApplicationFailAction({id: applicationId, error}))
                        })
                    )
            })
        )

}
