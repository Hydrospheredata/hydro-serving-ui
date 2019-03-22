
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {of as observableOf,  Observable } from 'rxjs';
import { switchMap, catchError ,  map } from 'rxjs/operators';

import { MdlSnackbarService } from '@angular-mdl/core';
import * as HydroActions from '@core/actions/monitoring.actions';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';

@Injectable()
export class MonitoringEffects {
    @Effect() name$: Observable<Action> = this.actions$.ofType('ACTIONTYPE');

    @Effect() addMetric$: Observable<Action> = this.actions$
        .ofType(HydroActions.MonitoringActionTypes.AddMetric)
        .pipe(
            map((action: HydroActions.AddMetricAction) => action.aggregation),
            switchMap(aggregation => {
                return this.metricService.addMetricSettings(aggregation)
                    .pipe(
                        map(response => {
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Metric was successfully added',
                                timeout: 5000,
                            });
                            return new HydroActions.AddMetricSuccessAction(new MetricSpecification(response));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000,
                            });
                            return observableOf(new HydroActions.AddMetricFailAction(error));
                        })
                    );
            })
        );

    @Effect() getMetrics$: Observable<Action> = this.actions$
        .ofType(HydroActions.MonitoringActionTypes.GetMetrics)
        .pipe(
            map((action: HydroActions.GetMetricsAction) => action.modelVersionId),
            switchMap(modelVersionId => {
                return this.metricService.getMetricSettings(modelVersionId)
                    .pipe(
                        map(response => {
                            const metricSpecifications = response.map(_ => new MetricSpecification(_));
                            return new HydroActions.GetMetricsSuccessAction(metricSpecifications);
                        }
                        ),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000,
                            });
                            return observableOf(new HydroActions.GetMetricsFailAction(error));
                        })
                    );
            })
        );

    @Effect() deleteMetric$: Observable<Action> = this.actions$
        .ofType(HydroActions.MonitoringActionTypes.DeleteMetric)
        .pipe(
            map((action: HydroActions.DeleteMetricAction) => action.id),
            switchMap(id => {
                return this.metricService.deleteMetricSettings(id)
                    .pipe(
                        map(_ => {
                            return new HydroActions.DeleteMetricSuccessAction({ id });
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000,
                            });
                            return observableOf(new HydroActions.GetMetricsFailAction(error));
                        })
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private metricService: MetricSettingsService,
        private mdlSnackbarService: MdlSnackbarService
    ) { }
}
