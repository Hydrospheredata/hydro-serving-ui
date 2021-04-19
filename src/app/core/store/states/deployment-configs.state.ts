import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { DeploymentConfig } from '../../data/types';

export interface State extends EntityState<DeploymentConfig> {
  loading: boolean;
  loaded: boolean;
}

export const adapter = createEntityAdapter<DeploymentConfig>({
  selectId: depConfig => depConfig.name,
});

export const initialState: State = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
};
