import { ActionReducerMap } from '@ngrx/store';
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
    runtimes: Runtime[];
    signatures: Signature[];
    sources: Source[];
    environments: Environment[];
    router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<HydroServingState> = {
    runtimes: RuntimesReducer,
    signatures: SignaturesReducer,
    sources: SourcesReducer,
    environments: EnvironmentsReducer,
    router: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
