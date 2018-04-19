import { Model } from '@shared/models/_index';
import { ModelActions, ModelActionTypes } from '@shared/actions/_index';



const initialState: Model[] = [];

export function ModelsReducer(state = initialState, action: ModelActions) {
    switch (action.type) {
        case ModelActionTypes.GetSuccess:
            return Object.assign([], state, action.payload);
        case ModelActionTypes.UpdateSuccess:
            return state.map(item => {
                if (item.id !== action.payload.model.id) {
                    return item;
                }
                const { nextVersion, ...model } = item;
                return new Model({
                    ...model,
                    lastModelVersion: {
                        ...action.payload
                    }
                });
            });
        default:
            return state;
    }
}
