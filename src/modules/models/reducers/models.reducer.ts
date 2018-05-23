import { Model } from '@shared/models/_index';
import { ModelActions, ModelActionTypes } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Model> {
    selectedModelId: string | null;
}

export const adapter: EntityAdapter<Model> = createEntityAdapter<Model>();

export const initialState: State = adapter.getInitialState({
    selectedModelId: null,
})


export function reducer(state = initialState, action: ModelActions) {
    switch (action.type) {
        case ModelActionTypes.GetSuccess:
            return adapter.addMany(action.payload, {
                ...state,
                selectedModelId: state.selectedModelId
            })
        // return Object.assign([], state, action.payload);
        case ModelActionTypes.BuildSuccess:
            return state;
        // return state.map(item => {
        //     if (item.id !== action.payload.model.id) {
        //         return item;
        //     }
        //     const { nextVersion, ...model } = item;
        //     return new Model({
        //         ...model,
        //         lastModelVersion: {
        //             ...action.payload
        //         }
        //     });
        // });
        default:
            return state;
    }
}
