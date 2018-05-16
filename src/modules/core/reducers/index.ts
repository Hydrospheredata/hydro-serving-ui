import { ActionReducerMap } from '@ngrx/store';
import * as fromApplications from '@applications/reducers/_index';
import {
    ModelsReducer,
    ModelBuildsReducer,
    RuntimesReducer,
    SignaturesReducer,
    SourcesReducer,
    EnvironmentsReducer,
    ModelVersionsReducer
} from '@shared/reducers/_index';
import { HydroServingState } from '@shared/_index';

export const reducers: ActionReducerMap<HydroServingState> = {
    applications: fromApplications.ApplicationsReducer,
    models: ModelsReducer,
    modelBuilds: ModelBuildsReducer,
    modelVersions: ModelVersionsReducer,
    runtimes: RuntimesReducer,
    signatures: SignaturesReducer,
    sources: SourcesReducer,
    environments: EnvironmentsReducer
};


