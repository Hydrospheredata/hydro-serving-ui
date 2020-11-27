import { Params, RouterStateSnapshot } from '@node_modules/@angular/router';
import { RouterStateSerializer } from '@node_modules/@ngrx/router-store';

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
