import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';
import { GetApplicationsAction } from '@applications/actions';

@Injectable()
export class ApplicationsGuard implements CanActivate {
    constructor(
        private store: Store<HydroServingState>
    ) { }

    canActivate() {
        this.store.dispatch(new GetApplicationsAction);
        return Observable.of(true);
    }
}