import { Service, Model, ModelService } from '@shared/models/_index';

export interface AppState {
    services: Service[];
    models: Model[];
    modelService: ModelService[];
}
