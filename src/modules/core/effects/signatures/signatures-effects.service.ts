
import { Injectable } from '@angular/core';
import * as HydroActions from '@core/actions';
import { SignaturesService } from '@core/services';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {of as observableOf,  Observable } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';
// import { Model } from '@shared/models/_index';

@Injectable()
export class SignaturesEffects {
    @Effect() getModelVersionSignatures$: Observable<Action> = this.actions$
    .pipe(
        ofType(HydroActions.SignaturesActionTypes.GetModelVersionSignatures),
            map((action: HydroActions.GetModelVersionSignaturesAction) => action.modelVersionId),
            switchMap(versionId => {
                return this.signaturesService
                    .getModelVersionSignatures(versionId)
                    .pipe(
                        take(1),
                        map(data => {
                            return new HydroActions.GetModelVersionSignaturesSuccessAction(data.signatures);
                        }),
                        catchError(error => observableOf(new HydroActions.GetModelVersionSignaturesFailAction(error)))
                    );
            })
        );

    constructor(
        private signaturesService: SignaturesService,
        private actions$: Actions
    ) { }
}
