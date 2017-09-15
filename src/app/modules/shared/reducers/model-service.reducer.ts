import { ModelService } from '@shared/models/_index';
import * as ServicesActions from '@shared/actions/_index';


const initialState: ModelService[] = [];


export function ModelServiceReducer (state = initialState, action: ServicesActions.ModelServiceActions) {
    switch (action.type) {
        case ServicesActions.GET_MODEL_SERVICE:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
