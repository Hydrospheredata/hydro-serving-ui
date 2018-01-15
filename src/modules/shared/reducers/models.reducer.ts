import { Model } from '@shared/models/_index';
import * as ModelActions from '@shared/actions/_index';



const initialState: Model[] = [];

export function ModelsReducer(state = initialState, action: ModelActions.ModelActions) {
    switch (action.type) {
    case ModelActions.GET_MODELS:
        return Object.assign([], state, action.payload);
    case ModelActions.ADD_MODEL:
        return [
            ...state.slice(0),
            action.payload
        ];
    case ModelActions.UPDATE_MODEL:
        return state.map(item => {
            if (item.model.id !== action.payload.model.id) {
                return item;
            }
            console.log('updated model item: ', new Model({...item,...action.payload}));
            return new Model({
                ...item,
                ...action.payload
            });
        });
    case ModelActions.DELETE_MODEL:
        return state.filter(service => service.model.id !== Number(action.modelId));
    default:
        return state;
    }
}
