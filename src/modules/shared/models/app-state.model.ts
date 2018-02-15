import { 
    Application, 
    Model, 
    ModelService,
    Runtime
} from '@shared/models/_index';

export interface AppState {
    applications: Application[];
    models: Model[];
    runtimes: Runtime[];
    modelService: ModelService[];
    modelBuilds: any;
    builds: any;
}
