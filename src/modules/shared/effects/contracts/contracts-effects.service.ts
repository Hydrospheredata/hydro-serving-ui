import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ContractsService } from '@shared/services/_index';
import * as HydroActions from '@shared/actions/_index';


@Injectable()
export class ContractsEffects {
    @Effect() getModelContracts$: Observable<Action> = this.actions.ofType(HydroActions.GET_MODEL_CONTRACTS)
        .map((action: HydroActions.GetModelContractsAction) => action.payload)
        .switchMap(payload => {
            return this.contractsService.getModelContracts(payload)
                .take(1)
                .map(data => {
                    return ({ type: HydroActions.GET_MODEL_CONTRACTS_SUCCESS, payload: data });
                });
        });

    @Effect() getModelBuildContracts$: Observable<Action> = this.actions.ofType(HydroActions.GET_MODEL_BUILD_CONTRACTS)
        .map((action: HydroActions.GetModelBuildContractsAction) => action.payload)
        .switchMap(payload => {
            return this.contractsService.getModelBuildContracts(payload)
                .take(1)
                .map(data => {
                    return ({ type: HydroActions.GET_MODEL_BUILD_CONTRACTS_SUCCESS, payload: data });
                });
        });

    constructor(
        private contractsService: ContractsService,
        private actions: Actions
    ) { }
}
