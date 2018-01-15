import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ModelsService, ModelRuntimesService, ModelServicesService } from '@shared/services/_index';
import { ModelService } from '@shared/models/_index';
import { ModelBuilder } from '@shared/builders/_index';
import * as HydroActions from '@shared/actions/_index';


@Injectable()
export class ModelEffects {
    @Effect() loadModels$: Observable<Action> = this.actions.ofType(HydroActions.LOAD_MODELS)
        .flatMap(() => this.modelsService.getModels().first()
            .map(data => {
                return ({ type: HydroActions.GET_MODELS, payload: data.map(this.modelBuilder.build, this.modelBuilder) })
            })
        );


    @Effect() getModelRuntimes$: Observable<Action> = this.actions.ofType(HydroActions.GET_MODEL_RUNTIMES)
        .map((action: HydroActions.GetModelRuntimesAction) => action.payload)
        .switchMap(payload => {
            console.log(payload);
            return this.modelRuntimesService.getModelRuntimesWithInfo(payload).take(1)
                .map((modelRuntime) => {
                    return ({ type: HydroActions.GET_MODEL_RUNTIMES_SUCCESS, payload: modelRuntime });
                })
        });

    // @Effect() switchModelsRuntime$: Observable<Action> = this.actions.ofType(HydroActions.SWITCH_MODEL)
    //     .mergeMap((action: HydroActions.SwitchModelAction) => this.modelRuntimesService.getModelRuntimesWithInfo(action.payload).first()
    //         .map(data => ({ type: HydroActions.GET_MODEL_RUNTIMES, payload: data })));

    // @Effect() switchModelsModel$: Observable<Action> = this.actions.ofType(HydroActions.SWITCH_MODEL)
    //     .mergeMap((action: HydroActions.SwitchModelAction) => this.modelsService.getModelWithInfo(action.payload).first()
    //         .map(data => {
    //             console.log(data);
    //             return ({ type: HydroActions.UPDATE_MODEL, payload: this.modelBuilder.build(data) })
    //         }));

    @Effect() getModelServices: Observable<Action> = this.actions.ofType(HydroActions.GET_MODEL_SERVICES)
        .switchMap(() => {
            return this.modelServicesService.getModelServices().take(1)
                .map((modelServices: ModelService[]) => {
                    return ({ type: HydroActions.GET_MODEL_SERVICES_SUCCESS, payload: modelServices });
                });
        });



    constructor(
        private modelBuilder: ModelBuilder,
        private modelsService: ModelsService,
        private modelServicesService: ModelServicesService,
        private modelRuntimesService: ModelRuntimesService,
        private actions: Actions
    ) {}
}
