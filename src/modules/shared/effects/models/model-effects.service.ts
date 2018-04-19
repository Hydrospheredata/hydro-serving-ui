import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ModelsService } from '@shared/services/_index';
import { ModelBuilder, ModelVersionBuilder, ModelBuildBuilder } from '@shared/builders/_index';
import * as HydroActions from '@shared/actions/_index';
import { flatMap, map, catchError } from 'rxjs/operators';



@Injectable()
export class ModelEffects {

    constructor(
        private modelBuilder: ModelBuilder,
        private modelVersionBuilder: ModelVersionBuilder,
        private modelBuildBuilder: ModelBuildBuilder,
        private modelsService: ModelsService,
        private actions$: Actions,
    ) { }

    @Effect() loadModels$: Observable<Action> = this.actions$
        .ofType(HydroActions.ModelActionTypes.Get)
        .pipe(
            flatMap(() => this.modelsService
                .getModels()
                .pipe(
                    map(data => {
                        return (new HydroActions.GetModelsSuccessAction(data.map(this.modelBuilder.build, this.modelBuilder)));
                    }),
                    catchError(error => {
                        return Observable.of(new HydroActions.GetModelsFailAction(error));
                    })
                )
            )
        );

    @Effect() getAllVersions$: Observable<Action> = this.actions$
        .ofType(HydroActions.ModelVersionActionTypes.GetModelVersions)
        .pipe(
            flatMap(() => this.modelsService
                .getAllVersions()
                .pipe(
                    map(data => {
                        const preparedData = data.map(this.modelVersionBuilder.build, this.modelVersionBuilder);
                        return (new HydroActions.GetModelVersionsSuccessAction(preparedData));
                    }),
                    catchError(error => Observable.of(new HydroActions.GetModelVersionsFailAction(error)))
                )
            )
        );

    @Effect() getModelBuilds$: Observable<Action> = this.actions$.ofType(HydroActions.GET_MODEL_BUILDS)
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
