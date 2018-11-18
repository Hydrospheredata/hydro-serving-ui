import { ModelVersionActionTypes, ModelVersionsActions } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ModelVersion } from '@shared/models/_index';

export interface State extends EntityState<ModelVersion> {
    selectedModelVersionId: string | null;
}

export const adapter: EntityAdapter<ModelVersion> = createEntityAdapter<ModelVersion>();

export const initialState: State = adapter.getInitialState({
    selectedModelVersionId: null,
});

export function reducer(state = initialState, action: ModelVersionsActions) {
    switch (action.type) {
        case ModelVersionActionTypes.GetModelVersionsSuccess:
            return adapter.addMany(action.payload, {
                ...state,
                selectedModelVersionId: state.selectedModelVersionId,
            });
        case ModelVersionActionTypes.AddModelVersionSuccess:
            return state;
        default:
            return state;
    }
}
