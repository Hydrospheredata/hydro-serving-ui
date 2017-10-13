import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { ActivatedRoute, Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { AppState, Service } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';

import { ServiceBuilder } from '@shared/builders/_index';
import { ServicesService }  from './services.service';

@Injectable()
export class ServicesRouterResolver implements Resolve<any> {
    constructor(
        private activatedRoute: ActivatedRoute,
        private servicesService: ServicesService,
        private serviceBuilder: ServiceBuilder,
        private store: Store<AppState>,
        private router: Router,
        private location: Location
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // let id = route.paramMap.get('id');

        return this.servicesService.getServices().map(services => {
            const data = services.map(service => this.serviceBuilder.build(service));
            const sortedData = data.sort((leftItem: any, rightItem: any): number => {
                if (leftItem['id'] > rightItem['id']) { return 1; }
                if (leftItem['id'] < rightItem['id']) { return -1; }
                return 0;
            });
            this.store.dispatch({ type: Actions.GET_SERVICES, payload: sortedData });
            // return null;
            if (sortedData.length) {
                console.log(this.activatedRoute);
                // this.location.go(`services/${sortedData[0].id}`)
                // this.router.navigate([`../${sortedData[0].id}`], {relativeTo: this.activatedRoute});
                this.router.navigate(['28']);
                // this.router.navigate([`/${sortedData[0].id}`]);
                return null;
            } else { // id not found
                // this.router.navigate(['/services']);
                return null;
            }
        });
    }
}