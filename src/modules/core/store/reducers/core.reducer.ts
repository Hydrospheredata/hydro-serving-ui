import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    let params = {};

    while (route.firstChild) {
      params = Object.assign(params, route.params);
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;

    params = Object.assign(params, route.params);
    return { url, params, queryParams };
  }
}

export interface HydroServingState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<HydroServingState> = {
  router: fromRouter.routerReducer,
};

export const selectRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');
