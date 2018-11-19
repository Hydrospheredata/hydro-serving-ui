// import { MetricSettings } from '@shared/models/metric-settings.model';
import {
    RuntimesReducer,
    SignaturesReducer,
    SourcesReducer,
    EnvironmentsReducer,
} from '@core/reducers/_index';
import { ActionReducerMap, createSelector } from '@ngrx/store';

import {
    Runtime,
    Signature,
    Source,
    Environment
} from '@shared/models/_index';

import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { MetricSettings } from '@shared/models/metric-settings.model';
import * as fromMonitoring from './monitoring.reducer';

export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const { url, root: { queryParams } } = routerState;
        const { params } = route;

        return { url, params, queryParams };
    }
}

export interface HydroServingState {
    runtimes: Runtime[];
    signatures: Signature[];
    sources: Source[];
    environments: Environment[];
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    metrics: fromMonitoring.MState | Error;
}

export const reducers: ActionReducerMap<HydroServingState> = {
    runtimes: RuntimesReducer,
    signatures: SignaturesReducer,
    sources: SourcesReducer,
    environments: EnvironmentsReducer,
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
    (metrics, router): MetricSettings[] => {
        return router.state
            ? Object.keys(metrics)
                    .reverse()
                    .map(metricId => metrics[metricId])
                    .filter(metric => metricWithoutFiltres(metric) || checkMetrickFilterStageId(metric, router))
            : [];
    }

);

function checkMetrickFilterStageId(metric: MetricSettings, router): boolean {
    const { id: appId, stageId} = router.state.params;
    return metric.filter.stageId === `app${appId}stage${stageId}`;
}

function metricWithoutFiltres(metric: MetricSettings): boolean {
    return Object.keys(metric.filter).length === 0;
}
