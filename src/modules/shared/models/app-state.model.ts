import { 
    Application, 
    Model, 
    ModelService,
    Runtime,
    Signature,
    Source,
} from '@shared/models/_index';

export interface AppState {
    applications: Application[];
    models: Model[];
    runtimes: Runtime[];
    modelService: ModelService[];
    contracts: Signature[];
    sources: Source[];
    modelBuilds: any;
    builds: any;
}
