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
} from '@core/reducers/_index';

import {
    Model,
    Runtime,
    Signature,
    Source,
    Environment,
    ModelVersion,
    ModelBuild
} from '@shared/models/_index';

export interface HydroServingState {
    applications: fromApplications.ApplicationsState;
    models: Model[];
    runtimes: Runtime[];
    signatures: Signature[];
    sources: Source[];
    environments: Environment[];
    modelVersions: ModelVersion[];
    modelBuilds: ModelBuild[];
}

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


