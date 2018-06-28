import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ModelsService } from '@models/services';
import { ModelBuilder, ModelVersionBuilder, ModelBuildBuilder } from '@core/builders/_index';
import * as HydroActions from '@models/actions';
import { flatMap, map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { MdlSnackbarService } from '@angular-mdl/core';
import { Router } from '@angular/router';



@Injectable()
export class ModelEffects {

    constructor(
        private modelBuilder: ModelBuilder,
        private modelVersionBuilder: ModelVersionBuilder,
        private modelBuildBuilder: ModelBuildBuilder,
        private modelsService: ModelsService,
        private actions$: Actions,
        private mdlSnackbarService: MdlSnackbarService,
        private router: Router,
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

    @Effect() getModelBuilds$: Observable<Action> = this.actions$
        .ofType(HydroActions.ModelBuildsActionTypes.GetBuilds)
        .pipe(
            map((action: HydroActions.GetModelBuildsAction) => action.modelId),
            flatMap(modelId => {
                return this.modelsService
                    .getModelBuilds(modelId)
                    .pipe(
                        map(data => {
                            const modelBuilds = data.map(this.modelBuildBuilder.build, this.modelBuildBuilder);
                            return new HydroActions.GetModelBuildsSuccessAction(modelBuilds);
                        }),
                        catchError((error) => {
                            return Observable.of(new HydroActions.GetModelBuildsFailAction(error));
                        })
                    );
            })
        );

    @Effect() buildModel$: Observable<Action> = this.actions$
        .ofType(HydroActions.ModelActionTypes.Build)
        .pipe(
            map((action: HydroActions.BuildModelAction) => action.payload),
            flatMap((options) => {
                return this.modelsService
                    .buildModel(options)
                    .pipe(
                        mergeMap((response) => {
                            this.mdlSnackbarService.showSnackbar({
                                message: 'Model has been released',
                                timeout: 5000
                            });
                            return Observable.from([
                                new HydroActions.BuildModelSuccessAction(response),
                                new HydroActions.AddModelVersionSuccessAction(response),
                                new HydroActions.GetModelBuildsAction(response.model.id)
                            ]);
                        }),
                        catchError((error) => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000
                            });
                            return Observable.of(new HydroActions.BuildModelFailAction(error));
                        })
                    );
            })
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
                                timeout: 5000
                            });
                            return (new HydroActions.DeleteModelSuccessAction(modelId));
                        }),
                        catchError(error => {
                            this.mdlSnackbarService.showSnackbar({
                                message: `Error: ${error}`,
                                timeout: 5000
                            });
                            return Observable.of(new HydroActions.DeleteModelFailAction(error));
                        })
                    );
            })
        );
}
