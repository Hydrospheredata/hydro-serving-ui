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
        return this.checkServiceExistService.isExist(route.params.id);
    }
}