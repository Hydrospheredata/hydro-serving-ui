import {
    Application,
    Model,
    Runtime,
    Signature,
    Source,
    Environment,
    ModelVersion,
    ModelBuild
} from '@shared/models/_index';

export interface AppState {
    applications: Application[];
    models: Model[];
    runtimes: Runtime[];
    contracts: Signature[];
    sources: Source[];
    environments: Environment[];
    modelVersions: ModelVersion[];
    modelBuilds: ModelBuild[];
}
