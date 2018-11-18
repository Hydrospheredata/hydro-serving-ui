
import { Injectable } from '@angular/core';
import * as HydroActions from '@core/actions';
import { RuntimeBuilder } from '@core/builders/_index';
import { RuntimesService } from '@core/services';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {map, first, mergeMap} from 'rxjs/operators';

@Injectable()
export class RuntimesEffects {
    @Effect() getRuntimes$: Observable<Action> = this.actions.ofType(HydroActions.GET_RUNTIMES).pipe(
        mergeMap(() => this.runtimesService.getRuntimes().pipe(first(),
            map(data => {
                return (
                    {
                        type: HydroActions.GET_RUNTIMES_SUCCESS,
                        payload: data.map(this.runtimeBuilder.build, this.runtimeBuilder),
                    });
            }), )
        ));

    constructor(
        private runtimeBuilder: RuntimeBuilder,
        private runtimesService: RuntimesService,
        private actions: Actions
    ) { }
}
