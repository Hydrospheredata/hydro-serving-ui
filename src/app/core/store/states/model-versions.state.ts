import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ModelVersion } from '../../data/types';

export interface State extends EntityState<ModelVersion> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<ModelVersion> = createEntityAdapter<
  ModelVersion
>();
export const initialState: State = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
};
