import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ModelVersionServiceStatusesEntity } from '@app/core/data/types';

export interface State extends EntityState<ModelVersionServiceStatusesEntity> {}

export const adapter: EntityAdapter<ModelVersionServiceStatusesEntity> = createEntityAdapter<
  ModelVersionServiceStatusesEntity
>();

export const initialState: State = {
  ids: [],
  entities: {},
};
