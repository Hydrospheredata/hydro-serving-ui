import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { Injectable } from '@angular/core';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

@Injectable()
export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl>
{
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
