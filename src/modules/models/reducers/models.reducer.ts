import { Model } from '@shared/models/_index';
import { ModelActions, ModelActionTypes } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Model> { }

export const adapter: EntityAdapter<Model> = createEntityAdapter<Model>();

export const initialState: State = adapter.getInitialState()


export function reducer(state = initialState, action: ModelActions) {
    switch (action.type) {
        case ModelActionTypes.GetSuccess:
            return adapter.addMany(action.payload, state);
        case ModelActionTypes.BuildSuccess:
            return state;
        default:
            return state;
    }
}
