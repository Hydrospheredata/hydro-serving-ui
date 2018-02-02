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
            console.log("UPDATE_MODEL: ", action.payload);
            if (item.id !== action.payload.id) {
                return item;
            }
            return new Model({
                ...item,
                ...action.payload
            });
        });
    default:
        return state;
    }
}
