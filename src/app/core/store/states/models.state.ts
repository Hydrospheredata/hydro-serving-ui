import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Model } from '../../data/types';

export interface State extends EntityState<Model> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<Model> = createEntityAdapter<Model>();
export const initialState = {
  ...adapter.getInitialState(),
  loading: false,
  loaded: false,
};
