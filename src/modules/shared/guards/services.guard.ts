import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

import { Store } from '@ngrx/store';
import { AppState, Service, ModelService } from '@shared/models/_index';
import * as HydroActions from '@shared/actions/_index';



@Injectable()
export class ServicesGuard implements CanActivate {

    constructor(
        private router: Router,
        private store: Store<AppState>
    ) {}

    getData(): Observable<any> {
        return this.store.select('services')
            .do((services: Service[]) => {
                if (!services.length) {
                    this.store.dispatch({ type: HydroActions.GET_SERVICES, payload: null });
                }
            })
            .filter((services: Service[]) => services.length > 0)
            .take(1);
    }

    canActivate(): Observable<boolean> | boolean {
        // this.getData().take(1).map((services) => console.log(services));
        this.router.navigate(['services/3']);
        return false;
    }
}
