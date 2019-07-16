import { ModelActions, ModelActionTypes } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Model } from '@shared/models/_index';

export interface State extends EntityState<Model> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Model> = createEntityAdapter<Model>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export function reducer(state = initialState, action: ModelActions) {
  switch (action.type) {
    case ModelActionTypes.Get:
      return { ...state, loading: true, loaded: false };
    case ModelActionTypes.GetSuccess:
      return adapter.addMany(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    case ModelActionTypes.GetFail:
      return { ...state, loading: false };
    case ModelActionTypes.DeleteSuccess:
      return adapter.removeOne(action.modelId, state);
    default:
      return state;
  }
}
