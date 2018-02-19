import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SourcesService } from '@shared/services/_index';
import * as HydroActions from '@shared/actions/_index';


@Injectable()
export class SourcesEffects {
    @Effect() getSources$: Observable<Action> = this.actions.ofType(HydroActions.GET_SOURCES)
        .flatMap(() => this.sourcesService.getSources().first()
            .map(data => {
                return ({ type: HydroActions.GET_SOURCES_SUCCESS, payload: data })
            })
        );

    constructor(
        private sourcesService: SourcesService,
        private actions: Actions
    ) {}
}
