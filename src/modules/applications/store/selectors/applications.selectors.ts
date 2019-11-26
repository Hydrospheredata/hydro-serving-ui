import * as fromRoot from '@core/store';
import { createSelector } from '@ngrx/store';
import { Application, TestStatus } from '@shared/_index';
import * as fromFeature from '../reducers';
import * as fromApplications from '../reducers/applications.reducer';

export const selectApplicationsDBState = createSelector(
  fromFeature.selectApplicationState,
  state => state.db
);

export const selectAllApplications = createSelector(
  selectApplicationsDBState,
  fromApplications.selectAllApplications
);

export const selectApplicationsEntities = createSelector(
  selectApplicationsDBState,
  fromApplications.selectApplicationEntities
);

export const selectApplicationLoaded = createSelector(
  selectApplicationsDBState,
  state => state.loaded
);
export const selectSelectedApplication = createSelector(
  selectApplicationsEntities,
  fromRoot.selectRouterState,
  (entities, router): Application => {
    return router.state && entities[router.state.params.name];
  }
);

export const getSelectedApplicationName = createSelector(
  selectSelectedApplication,
  (application: Application): string => application && application.name
);

export const getSelectedApplicationSignatureName = createSelector(
  selectSelectedApplication,
  (application: Application): string => {
    return application && application.signature.signatureName;
  }
);

export const getSelectedApplicationId = createSelector(
  selectSelectedApplication,
  (application: Application): number => application && application.id
);

export const getSelectedApplicationInput = createSelector(
  selectSelectedApplication,
  (application: Application): string => application && application.input
);

export const getSelectedApplicationOutput = createSelector(
  selectSelectedApplication,
  (application: Application): string => application && application.output
);

export const getSelectedApplicationTestStatus = createSelector(
  selectSelectedApplication,
  (application: Application): TestStatus =>
    application && application.testStatus
);
