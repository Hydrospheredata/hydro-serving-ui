import { ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromApplications from './applications.reducer';
import * as fromModels from './models.reducer';
import * as fromModelVersions from './model-version.reducer';
import * as fromServables from './servables.reducer';
import * as fromDeploymentConfigs from './deployment-configs.reducer';
import * as fromServiceStatuses from './service-statuses.reducer';

import { HydroServingState } from '../states/root.state';

export const reducers: ActionReducerMap<HydroServingState> = {
  router: fromRouter.routerReducer,
  applications: fromApplications.reducer,
  modelVersions: fromModelVersions.reducer,
  models: fromModels.reducer,
  servables: fromServables.reducer,
  deploymentConfigs: fromDeploymentConfigs.reducer,
  serviceStatuses: fromServiceStatuses.reducer,
};
