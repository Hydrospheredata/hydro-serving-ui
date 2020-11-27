import { DeploymentConfig } from '../../data/types';

export interface State {
  configs: DeploymentConfig[];
}

export const initialState: State = {
  configs: [],
};
