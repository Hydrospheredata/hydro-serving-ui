import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ModelsService } from '@shared/services/_index';
import { ModelBuilder, ModelVersionBuilder, ModelBuildBuilder } from '@shared/builders/_index';
import * as HydroActions from '@shared/actions/_index';



@Injectable()
export class ModelEffects {

    constructor(
        private modelBuilder: ModelBuilder,
        private modelVersionBuilder: ModelVersionBuilder,
        private modelBuildBuilder: ModelBuildBuilder,
        private modelsService: ModelsService,
        private actions: Actions,
    ) { }

    @Effect() loadModels$: Observable<Action> = this.actions.ofType(HydroActions.GET_MODELS)
        .flatMap(() => this.modelsService.getModels().first()
            .map(data => {
                return ({ type: HydroActions.GET_MODELS_SUCCESS, payload: data.map(this.modelBuilder.build, this.modelBuilder) });
            })
        );

    @Effect() getAllVersions$: Observable<Action> = this.actions.ofType(HydroActions.GET_ALL_VERSIONS)
        .flatMap(() => this.modelsService.getAllVersions().first()
            .map(data => {
                const preparedData = data.map(this.modelVersionBuilder.build, this.modelVersionBuilder);
                return ({ type: HydroActions.GET_ALL_VERSIONS_SUCCESS, payload: preparedData });
            })
        );

    @Effect() getModelBuilds$: Observable<Action> = this.actions.ofType(HydroActions.GET_MODEL_BUILDS)
        .map((action: HydroActions.GetModelBuildsAction) => action.payload)
        .switchMap(payload => {
            return this.modelsService.getModelBuilds(payload)
                .take(1)
                .map(data => {
                    const preparedData = data.map(this.modelBuildBuilder.build, this.modelBuildBuilder);
                    return ({ type: HydroActions.GET_MODEL_BUILDS_SUCCESS, payload: preparedData });
                });
        });

}
