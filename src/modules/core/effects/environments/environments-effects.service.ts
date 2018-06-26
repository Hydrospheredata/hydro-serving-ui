import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EnvironmentsService } from '@core/services';
import * as HydroActions from '@core/actions';


@Injectable()
export class EnvironmentsEffects {
    @Effect() getEnvironments$: Observable<Action> = this.actions.ofType(HydroActions.GET_ENVIRONMENTS)
        .flatMap(() => this.environmentsService.getEnvironments().first()
            .map(data => {
                return ({ type: HydroActions.GET_ENVIRONMENTS_SUCCESS, payload: data });
            })
        );

    constructor(
        private environmentsService: EnvironmentsService,
        private actions: Actions
    ) { }
}
