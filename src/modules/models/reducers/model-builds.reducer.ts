import { ModelBuild } from '@shared/models/_index';
import { ModelBuildsActions, ModelBuildsActionTypes } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<ModelBuild> { }

export const adapter: EntityAdapter<ModelBuild> = createEntityAdapter<ModelBuild>();

export const initialState: State = adapter.getInitialState()

export function reducer(state = initialState, action: ModelBuildsActions) {
    switch (action.type) {
        case ModelBuildsActionTypes.GetBuildsSuccess:
            return adapter.addAll(action.payload, state);
        default:
            return state;
    }
}
