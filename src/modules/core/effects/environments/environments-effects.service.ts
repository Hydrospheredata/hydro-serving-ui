
import { Injectable } from '@angular/core';
import * as HydroActions from '@core/actions';
import { EnvironmentsService } from '@core/services';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {map, first, mergeMap} from 'rxjs/operators';

@Injectable()
export class EnvironmentsEffects {
    @Effect() getEnvironments$: Observable<Action> = this.actions.ofType(HydroActions.GET_ENVIRONMENTS).pipe(
        mergeMap(() => this.environmentsService.getEnvironments().pipe(first(),
            map(data => {
                return ({ type: HydroActions.GET_ENVIRONMENTS_SUCCESS, payload: data });
            }), )
        ));

    constructor(
        private environmentsService: EnvironmentsService,
        private actions: Actions
    ) { }
}
