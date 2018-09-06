import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromApplication from '@applications/reducers';
import { MdlSnackbarService } from '@angular-mdl/core';
import { Application } from '@shared/_index';
@Injectable()
export class ApplicationsGuard implements CanActivateChild{
    private defaultUrl: string = '/applications';

    constructor(
        private store: Store<fromApplication.State>,
        private router: Router,
        public mdlSnackbarService: MdlSnackbarService
    ) { }

    canActivateChild(routerSnapshot: ActivatedRouteSnapshot): Observable<boolean> | boolean {
        return this.store.select(fromApplication.getApplicationFetchStatus)
            .filter(this.applicationsIsFetched)
            .switchMap(_ => {
                const applicationId = +routerSnapshot.params.id;
                return this.isApplicationExist(applicationId)
            })
    }

    private applicationsIsFetched(fetchStatus): boolean {
        return fetchStatus.fetchedBefore && !fetchStatus.fetching;
    }

    private isApplicationExist(applicationId: number): Observable<boolean> {
        return this.store.select(fromApplication.getAllApplications).map((applications: Application[]) => {
            const isApplicationExist: boolean = applications.some(app => app.id === applicationId);

            if(isApplicationExist){
                return true;
            } else {
                this.router.navigate([this.defaultUrl]);
                this.mdlSnackbarService.showSnackbar({
                    message: `Application with id = ${applicationId} doesn't exist`,
                    timeout: 3000
                });
                return false;
            }
        })
    }
}