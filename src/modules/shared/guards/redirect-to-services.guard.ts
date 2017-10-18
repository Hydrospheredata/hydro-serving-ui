import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { CheckServiceExistService } from '@shared/services/_index';

@Injectable()
export class RedirectToServicesGuard implements CanActivate {

    constructor(
        private router: Router,
        private checkServiceExistService: CheckServiceExistService
    ) {}

    canActivate(route: ActivatedRouteSnapshot) {
        this.router.events.subscribe(event => {
          console.log(event);
        });
        console.warn('CANACTIVATE YO');
        console.warn(this.router.url);
        console.warn(route.url);
        return true;
    }
}
