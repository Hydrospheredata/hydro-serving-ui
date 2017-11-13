import { Component, OnDestroy, Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ModelsService, ModelRuntimesService, ModelServicesService, HttpModelsService } from '@shared/services/_index';
import { AppState, Model, ModelService } from '@shared/models/_index';
import { ModelBuilder } from '@shared/builders/_index';
import * as HydroActions from '@shared/actions/_index';


@Injectable()
export class ModelEffects {
    @Effect() loadModels$: Observable<Action> = this.actions.ofType(HydroActions.LOAD_MODELS)
        .flatMap(action => this.modelsService.getModels().first()
            .map(data => ({ type: HydroActions.GET_MODELS, payload: data.map(this.modelBuilder.build, this.modelBuilder) }))
        );

    @Effect() switchModelsRuntime$: Observable<Action> = this.actions.ofType(HydroActions.SWITCH_MODEL)
        .mergeMap((action: HydroActions.SwitchModelAction) => this.modelRuntimesService.getModelRuntimesWithInfo(action.payload).first()
            .map(data => ({ type: HydroActions.GET_MODEL_RUNTIME, payload: data })));

    @Effect() switchModelsModel$: Observable<Action> = this.actions.ofType(HydroActions.SWITCH_MODEL)
        .mergeMap((action: HydroActions.SwitchModelAction) => this.modelsService.getModelWithInfo(action.payload).first()
            .map(data => ({ type: HydroActions.UPDATE_MODEL, payload: this.modelBuilder.build(data) })));

    @Effect() getModelServices: Observable<Action> = this.actions.ofType(HydroActions.GET_MODEL_SERVICES)
        .switchMap(action => {
            return this.modelServicesService.getModelServices().take(1)
                .map((modelServices: ModelService[]) => {
                    return ({ type: HydroActions.GET_MODEL_SERVICES_SUCCESS, payload: modelServices })
                })
        });



    constructor(
        private modelBuilder: ModelBuilder,
        private modelsService: ModelsService,
        private modelServicesService: ModelServicesService,
        private modelRuntimesService: ModelRuntimesService,
        private actions: Actions,
        private oldModelsService: HttpModelsService
    ) {}
}
