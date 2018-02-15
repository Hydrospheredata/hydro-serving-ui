import { 
    Application, 
    Model, 
    ModelService,
    Runtime,
    Signature
} from '@shared/models/_index';

export interface AppState {
    applications: Application[];
    models: Model[];
    runtimes: Runtime[];
    modelService: ModelService[];
    contracts: Signature[];
    modelBuilds: any;
    builds: any;
}
