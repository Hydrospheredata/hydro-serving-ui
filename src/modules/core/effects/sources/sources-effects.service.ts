
import { Injectable } from '@angular/core';
import * as HydroActions from '@core/actions';
import { SourcesService } from '@core/services';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import {map, first, mergeMap} from 'rxjs/operators';

@Injectable()
export class SourcesEffects {
    @Effect() getSources$: Observable<Action> = this.actions.ofType(HydroActions.GET_SOURCES).pipe(
        mergeMap(() => this.sourcesService.getSources().pipe(first(),
            map(data => {
                return ({ type: HydroActions.GET_SOURCES_SUCCESS, payload: data });
            }), )
        ));

    constructor(
        private sourcesService: SourcesService,
        private actions: Actions
    ) { }
}
