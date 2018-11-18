import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivateChild } from '@angular/router';

import * as fromApplication from '@applications/reducers';
import { Store } from '@ngrx/store';

import { Application } from '@shared/_index';

import { MdlSnackbarService } from '@angular-mdl/core';
import { Observable ,  of } from 'rxjs';
import { filter, take, switchMap} from 'rxjs/operators';

@Injectable()
export class ApplicationsGuard implements CanActivateChild {
    private defaultUrl: string = '/applications';

    constructor(
        private store: Store<fromApplication.State>,
        private router: Router,
        public mdlSnackbarService: MdlSnackbarService
    ) { }

    canActivateChild(routerSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
        return this.applicationsAreLoaded().pipe(
            switchMap( _ => this.store.select(fromApplication.getAllApplications)),
            switchMap((applications: Application[]) => {
                const applicationId = Number(routerSnapshot.params.id);
                const application: Application = applications.find(app => app.id === applicationId);

                if (application) {
                    if (routerSnapshot.params.stageId !== undefined) {
                        const stageId = Number(routerSnapshot.params.stageId);
                        return this.checkStage(application, stageId);
                    }
                    return of(true);
                } else {
                    this.router.navigate([this.defaultUrl]);
                    this.mdlSnackbarService.showSnackbar({
                        message: `Application with id = ${applicationId} doesn't exist`,
                        timeout: 5000,
                    });
                    return of(false);
                }
            })
        );
    }

    private applicationsAreLoaded(): Observable<boolean> {
        return this.store.select(fromApplication.getApplicationEntitiesLoaded).pipe(
            filter(loaded => loaded),
            take(1)
        );
    }

    private checkStage(application: Application, stageId: number): Observable<boolean> {
        const stage = application.executionGraph.stages[stageId];
        if (stage) {
            return of(true);
        } else {
            this.router.navigate([this.defaultUrl, application.id]);
            this.mdlSnackbarService.showSnackbar({
                message: `Stage: ${stageId} doesn't exist for application with id: ${application.id}`,
                timeout: 5000,
            });
            return of(false);
        }
    }
}
