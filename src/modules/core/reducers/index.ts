// import { MetricSettings } from '@shared/models/metric-settings.model';
import {
    RuntimesReducer,
    SignaturesReducer,
} from '@core/reducers/_index';
import { ActionReducerMap, createSelector } from '@ngrx/store';

import {
    Runtime,
    Signature,
    Environment
} from '@shared/models/_index';

import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { IMetricSpecification } from '@shared/models/metric-specification.model';
import * as fromMonitoring from './monitoring.reducer';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;
        let params = {};

        while (route.firstChild) {
            params = Object.assign(params, route.params);
            route = route.firstChild;
        }

        const { url, root: { queryParams } } = routerState;

        params = Object.assign(params, route.params);
        return { url, params, queryParams };
    }
}

export interface HydroServingState {
    runtimes: Runtime[];
    signatures: Signature[];
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    metrics: fromMonitoring.MState | Error;
}

export const reducers: ActionReducerMap<HydroServingState> = {
    runtimes: RuntimesReducer,
    signatures: SignaturesReducer,
    router: fromRouter.routerReducer,
    metrics: fromMonitoring.reducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const getRouterParams = createSelector(
    getRouterState,
    router => router.state
);

export const getMetricsState = createFeatureSelector<fromMonitoring.MState>('metrics');

export const getMetricsEntitiesState = createSelector(
    getMetricsState,
    state => state
);

export const {
    selectEntities: getMetricsEntities,
    selectAll: getAllMetrics,
    selectTotal: getTotalMetrics,
} = fromMonitoring.adapter.getSelectors(getMetricsEntitiesState);

export const getSelectedMetrics = createSelector(
    getMetricsEntities,
    getRouterState,
    (metrics, router): IMetricSpecification[] => {
        const {modelVersionId} = router.state.params;

        if (modelVersionId === undefined ) { return; }

        return Object.entries(metrics)
                .reduce(
                    (res: IMetricSpecification[], [_, metricSpec]) => {
                        if (metricSpec.modelVersionId === +modelVersionId) {
                            res.push(metricSpec);
                        }
                        return res;
                    }
                    , []
                );
    }
);

export const getSelectedMetric = createSelector(
    getMetricsEntities,
    getRouterState,
    (metrics, router): IMetricSpecification => {
        return router.state.params.metricId && metrics[router.state.params.metricId];
    }
);
