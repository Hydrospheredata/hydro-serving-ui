import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { HydroServingState } from "@core/reducers";
import { GetModelBuildsAction } from "@models/actions";

@Injectable()
export class ModelDetailsGuard implements CanActivate {

    constructor(
        private store: Store<HydroServingState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.store.dispatch(new GetModelBuildsAction(route.params.modelId));
        return Observable.of(true);
    }

}