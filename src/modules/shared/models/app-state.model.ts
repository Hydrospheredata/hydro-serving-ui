import { 
    Application, 
    Model, 
    ModelService
} from '@shared/models/_index';

export interface AppState {
    applications: Application[];
    models: Model[];
    modelService: ModelService[];
    modelBuilds: any;
    builds: any;
}
