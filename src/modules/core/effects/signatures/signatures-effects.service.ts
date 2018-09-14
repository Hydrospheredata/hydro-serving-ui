import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SignaturesService } from '@core/services';
import * as HydroActions from '@core/actions';
import { map, switchMap, catchError, take } from 'rxjs/operators';
// import { Model } from '@shared/models/_index';



@Injectable()
export class SignaturesEffects {

    @Effect() getSignatures$: Observable<Action> = this.actions$
        .ofType(HydroActions.SignaturesActionTypes.GetSignatures)
        .pipe(
            map((action: HydroActions.GetSignaturesAction) => action.payload),
            switchMap(payload => {
                let obs;
                if (payload.type === 'model') {
                    obs = this.signaturesService.getModelSignatures(payload.id)
                        .pipe(
                            take(1),
                            map(data => {
                                return new HydroActions.GetSignaturesSuccessAction(data.signatures);
                            }),
                            catchError(error => Observable.of(new HydroActions.GetSignaturesFailAction(error)))
                        );
                } else {
                    obs = Observable.of(new HydroActions.GetModelVersionSignaturesAction(payload.id));
                }
                return obs;
            })
        );
    
    @Effect() getModelVersionSignatures$: Observable<Action> = this.actions$
        .ofType(HydroActions.SignaturesActionTypes.GetModelVersionSignatures)
        .pipe(
            map((action: HydroActions.GetModelVersionSignaturesAction) => action.modelVersionId),
            switchMap(versionId => {
                return this.signaturesService
                    .getModelVersionSignatures(versionId)
                    .pipe(
                        take(1),
                        map(data => {
                            return new HydroActions.GetModelVersionSignaturesSuccessAction(data.signatures);
                        }),
                        catchError(error => Observable.of(new HydroActions.GetModelVersionSignaturesFailAction(error)))
                    );
            })
        );
    
    constructor(
        private signaturesService: SignaturesService,
        private actions$: Actions
    ) { }
}
