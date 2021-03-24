import { RouterStateUrl } from '../states/router.state';
import * as fromRouter from '@ngrx/router-store';

import * as fromApplications from './applications.state';
import * as fromModels from './models.state';
import * as fromModelVersions from './model-versions.state';
import * as fromServables from './servables.state';
import * as fromDeploymentConfigs from './deployment-configs.state';
import * as fromServiceStatuses from './service-statuses.state'

export interface HydroServingState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  applications: fromApplications.State;
  models: fromModels.State;
  modelVersions: fromModelVersions.State;
  servables: fromServables.State;
  deploymentConfigs: fromDeploymentConfigs.State;
  serviceStatuses: fromServiceStatuses.State
}

export const initialState: HydroServingState = {
  router: {
    state: {
      url: '/',
      params: {},
      queryParams: {},
    },
    navigationId: 0,
  },
  applications: fromApplications.initialState,
  models: fromModels.initialState,
  modelVersions: fromModelVersions.initialState,
  servables: fromServables.initialState,
  deploymentConfigs: fromDeploymentConfigs.initialState,
  serviceStatuses: fromServiceStatuses.initialState
};
