import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SignaturesService } from '@shared/services/_index';
import * as HydroActions from '@shared/actions/_index';
import { map, switchMap, catchError, take } from 'rxjs/operators';
import { Model } from '@shared/models/_index';



@Injectable()
export class SignaturesEffects {

    @Effect() getSignatures$: Observable<Action> = this.actions$
        .ofType(HydroActions.SignaturesActionTypes.GetSignatures)
        .pipe(
            map((action: HydroActions.GetSignaturesAction) => action.payload),
            switchMap(payload => {
                let obs;
                const isModel = payload instanceof Model;
                if (isModel) {
                    obs = this.signaturesService.getModelSignatures(payload.id)
                        .pipe(
                            take(1),
                            map(data => {
                                return new HydroActions.GetSignaturesSuccessAction(data.signatures);
                            }),
                            catchError(error => Observable.of(new HydroActions.GetSignaturesFailAction(error)))
                        );
                } else {
                    obs = Observable.of(new HydroActions.GetModelBuildSignaturesAction(payload.id));
                }
                return obs;
            })
        );

    @Effect() getModelBuildSignatures$: Observable<Action> = this.actions$
        .ofType(HydroActions.SignaturesActionTypes.GetModelBuildSignatures)
        .pipe(
            map((action: HydroActions.GetModelBuildSignaturesAction) => action.buildId),
            switchMap(buildId => {
                return this.signaturesService
                    .getModelBuildSignatures(buildId)
                    .pipe(
                        take(1),
                        map(data => {
                            return new HydroActions.GetModelBuildSignaturesSuccessAction(data.signatures);
                        }),
                        catchError(error => Observable.of(new HydroActions.GetModelBuildSignaturesFailAction(error)))
                    );
            })
        );

    constructor(
        private signaturesService: SignaturesService,
        private actions$: Actions
    ) { }
}
