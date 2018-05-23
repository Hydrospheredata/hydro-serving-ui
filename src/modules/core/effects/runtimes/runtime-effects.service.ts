import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RuntimesService } from '@core/services/_index';
import { RuntimeBuilder } from '@core/builders/_index';
import * as HydroActions from '@shared/actions/_index';


@Injectable()
export class RuntimesEffects {
    @Effect() getRuntimes$: Observable<Action> = this.actions.ofType(HydroActions.GET_RUNTIMES)
        .flatMap(() => this.runtimesService.getRuntimes().first()
            .map(data => {
                return ({ type: HydroActions.GET_RUNTIMES_SUCCESS, payload: data.map(this.runtimeBuilder.build, this.runtimeBuilder) });
            })
        );

    constructor(
        private runtimeBuilder: RuntimeBuilder,
        private runtimesService: RuntimesService,
        private actions: Actions
    ) { }
}
