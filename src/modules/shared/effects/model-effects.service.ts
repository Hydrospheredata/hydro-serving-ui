import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ModelsService, ModelRuntimesService, ModelServicesService, HttpModelsService } from '@shared/services/_index';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState, Model } from '@shared/models/_index';
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



  constructor(
    private modelBuilder: ModelBuilder,
    private modelsService: ModelsService,
    private modelRuntimesService: ModelRuntimesService,
    private actions: Actions,
    private oldModelsService: HttpModelsService
  ) { }

}
