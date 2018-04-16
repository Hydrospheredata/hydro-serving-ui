import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ApplicationBuilder } from '@shared/builders/_index';
import { ApplicationsService } from '@shared/services/_index';
import { ApplicationState, Application } from '@shared/models/_index';
import { ApplicationActionTypes, DeleteApplicationAction } from '@shared/actions/_index';
import { withLatestFrom, switchMap } from 'rxjs/operators';

@Injectable()
export class ApplicationsEffects {

    @Effect() getServices$: Observable<Action> = this.actions$
        .ofType(ApplicationActionTypes.Get)
        .pipe(
            withLatestFrom(this.store.select('applications')),
            switchMap(store => {
                const applications = store[1];
                if (applications.length) {
                    return Observable.of({ type: ApplicationActionTypes.GetSuccess, payload: [] });
                } else {
                    return this.applicationsService.getApplications().take(1)
                        .map((apps: Application[]) => {
                            const data = apps.map(app => this.applicationBuilder.build(app));
                            return ({ type: ApplicationActionTypes.GetSuccess, payload: data });
                        })
                        .catch(() => Observable.of({ type: ApplicationActionTypes.GetFail }));
                }
            })
        );

    @Effect() deleteApplication$: Observable<Action> = this.actions$
        .ofType(ApplicationActionTypes.Delete)
        .map((action: DeleteApplicationAction) => action.applicationId)
        .switchMap(applicationId => {
            return this.applicationsService.deleteApplication(applicationId)
                .map(() => {
                    this.router.navigate(['applications']);
                    return ({ type: ApplicationActionTypes.DeleteSuccess, applicationId: applicationId });
                });
        });

    constructor(
        private actions$: Actions,
        private router: Router,
        private applicationsService: ApplicationsService,
        private applicationBuilder: ApplicationBuilder,
        private store: Store<ApplicationState>,
    ) { }
}
