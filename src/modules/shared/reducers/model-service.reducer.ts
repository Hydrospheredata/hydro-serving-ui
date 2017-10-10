import { ModelService } from '@shared/models/_index';
import * as ModelServiceActions from '@shared/actions/_index';


const initialState: ModelService[] = [];


export function ModelServiceReducer (state = initialState, action: ModelServiceActions.ModelServiceActions) {
    switch (action.type) {
        case ModelServiceActions.GET_MODEL_SERVICE:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
