// import { MetricSettings } from '@shared/models/metric-settings.model';
import { ActionReducerMap, createSelector } from '@ngrx/store';
import {
    RuntimesReducer,
    SignaturesReducer,
    SourcesReducer,
    EnvironmentsReducer,
} from '@core/reducers/_index';

import {
    Runtime,
    Signature,
    Source,
    Environment,
} from '@shared/models/_index';

import * as fromRouter from '@ngrx/router-store';
import * as fromMonitoring from './monitoring.reducer';
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { MetricSettings } from '@shared/models/metric-settings.model';

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
    metrics: fromMonitoring.MState | Error
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
    (router) => router.state
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
    (entities, router): MetricSettings[] => router.state ? Object.keys(entities).reverse().map(_ => entities[_]).filter(_ => Object.keys(_.filter).length === 0 || _.filter["stageId"] == `app${router.state.params["id"]}stage${router.state.params["stageId"]}`) : []
);