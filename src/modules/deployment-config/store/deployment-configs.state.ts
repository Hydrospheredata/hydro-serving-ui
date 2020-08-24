import { DeploymentConfig } from '../models';

export interface State {
  configs: DeploymentConfig[];
}

export const initialState = (): State => ({
  configs: [],
});
