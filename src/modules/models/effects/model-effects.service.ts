
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of as observableOf,  Observable } from 'rxjs';

import { MdlSnackbarService } from '@angular-mdl/core';
import { Router } from '@angular/router';
import { ModelBuilder, ModelVersionBuilder } from '@core/builders/_index';
import * as HydroActions from '@models/actions';
import { ModelsService } from '@models/services';
import { flatMap, map, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ModelEffects {

    @Effect() getAllModels$: Observable<Action> = this.actions$
        .ofType(HydroActions.ModelActionTypes.Get)
        .pipe(
            flatMap(() => this.modelsService
                .getModels()
                .pipe(
                    map(data => {
                        const newData = data.map(this.modelBuilder.build, this.modelBuilder);
                        return (new HydroActions.GetModelsSuccessAction(newData));
                    }),
                    catchError(error => {
                        return observableOf(new HydroActions.GetModelsFailAction(error));
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
                    catchError(error => observableOf(new HydroActions.GetModelVersionsFailAction(error)))
                )
            )
        );

    @Effect() deleteModel$: Observable<Action> = this.actions$
        .ofType(HydroActions.ModelActionTypes.Delete)
        .pipe(
            map((action: HydroActions.DeleteModelAction) => action.modelId),
            switchMap(modelId => {
                return this.modelsService
                    .deleteModel(modelId)
                    .pipe(
                        map(() => {
                            this.router.navigate(['models']);
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Model has been deleted',
                                timeout: 5000,
                            });
                            return (new HydroActions.DeleteModelSuccessAction(modelId));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000,
                            });
                            return observableOf(new HydroActions.DeleteModelFailAction(error));
                        })
                    );
            })
        );

    constructor(
        private modelBuilder: ModelBuilder,
        private modelVersionBuilder: ModelVersionBuilder,
        private modelsService: ModelsService,
        private actions$: Actions,
        private mdlSnackbarService: MdlSnackbarService,
        private router: Router
    ) { }
}
