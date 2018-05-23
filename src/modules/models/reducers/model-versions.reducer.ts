import { ModelVersion } from '@shared/models/_index';
import { ModelVersionActionTypes, ModelVersionsActions } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<ModelVersion> {
    selectedModelVersionId: string | null;
}

export const adapter: EntityAdapter<ModelVersion> = createEntityAdapter<ModelVersion>();

export const initialState: State = adapter.getInitialState({
    selectedModelVersionId: null,
})

export function reducer(state = initialState, action: ModelVersionsActions) {
    switch (action.type) {
        case ModelVersionActionTypes.GetModelVersionsSuccess:
            return state;
        // return action.payload;
        case ModelVersionActionTypes.AddModelVersionSuccess:
            return state;
        // return [
        //     ...state.slice(0),
        //     action.payload
        // ];
        default:
            return state;
    }
}
