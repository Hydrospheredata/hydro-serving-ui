import { 
    Application, 
    Model, 
    // ModelService,
    Runtime,
    Signature,
    Source,
    Environment,
    ModelVersion
} from '@shared/models/_index';

export interface AppState {
    applications: Application[];
    models: Model[];
    runtimes: Runtime[];
    // modelService: ModelService[];
    contracts: Signature[];
    sources: Source[];
    environments: Environment[];
    modelVersions: ModelVersion[];
    modelBuilds: any;
    // builds: any;
}
