import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ModelsService } from '@shared/services/_index';
import { ModelBuilder } from '@shared/builders/_index';
import * as HydroActions from '@shared/actions/_index';


@Injectable()
export class ModelEffects {
    @Effect() loadModels$: Observable<Action> = this.actions.ofType(HydroActions.GET_MODELS)
        .flatMap(() => this.modelsService.getModels().first()
            .map(data => {
                return ({ type: HydroActions.GET_MODELS_SUCCESS, payload: data.map(this.modelBuilder.build, this.modelBuilder) })
            })
        );

    @Effect() getModelRuntimes$: Observable<Action> = this.actions.ofType(HydroActions.GET_MODEL_BUILDS)
        .map((action: HydroActions.GetModelBuildsAction) => action.payload)
        .switchMap(payload => {
            return this.modelsService.getModelBuilds(payload)
                .take(1)
                .map(data => {
                    return ({ type: HydroActions.GET_MODEL_BUILDS_SUCCESS, payload: data });
                })
        });

    constructor(
        private modelBuilder: ModelBuilder,
        private modelsService: ModelsService,
        private actions: Actions
    ) {}
}
