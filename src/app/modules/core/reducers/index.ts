import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromApplications from '@applications/reducers/_index';
import {
    ModelsReducer,
    ModelBuildsReducer,
    RuntimesReducer,
    SignaturesReducer,
    SourcesReducer,
    EnvironmentsReducer,
    ModelVersionsReducer
} from '@core/reducers/_index';

import {
    Model,
    Runtime,
    Signature,
    Source,
    Environment,
    ModelVersion,
    ModelBuild
} from '@shared/models/_index';

import * as fromRouter from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

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
    applications: fromApplications.ApplicationsState;
    models: Model[];
    runtimes: Runtime[];
    signatures: Signature[];
    sources: Source[];
    environments: Environment[];
    modelVersions: ModelVersion[];
    modelBuilds: ModelBuild[];
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<HydroServingState> = {
    applications: fromApplications.ApplicationsReducer,
    models: ModelsReducer,
    modelBuilds: ModelBuildsReducer,
    modelVersions: ModelVersionsReducer,
    runtimes: RuntimesReducer,
    signatures: SignaturesReducer,
    sources: SourcesReducer,
    environments: EnvironmentsReducer,
    router: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const getRouterNavigationId = createSelector(
    getRouterState,
    (state) => state
);
