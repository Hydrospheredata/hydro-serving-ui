import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';
import { GetApplicationsAction } from '@applications/actions';
import * as fromApplication from '@applications/reducers';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ApplicationsGuard implements CanActivate {
    constructor(
        private store: Store<HydroServingState>
    ) { }

    isApplicationsExist(): Observable<boolean> {
        return this.store.select(fromApplication.getTotalApplications)
            .map(entities => !!entities)
    }

    canActivate() {
        return this.isApplicationsExist()
            .pipe(
                switchMap(isExist => {
                    if (isExist) {
                        return Observable.of(isExist);
                    }
                    this.store.dispatch(new GetApplicationsAction);
                    return Observable.of(true);
                })
            )
    }
}