import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Application, TestStatus } from '../../data/types';

import { selectRouterState } from '../selectors/router.selectors';
import { State, adapter } from '../states/applications.state';

const state = createFeatureSelector<State>('applications');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllApplications = createSelector(state, selectAll);
export const selectApplicationsEntities = createSelector(state, selectEntities);

export const selectNonFavoriteApplications = createSelector(
  selectAllApplications,
  apps => apps.filter(_ => !_.favorite)
);

export const selectFavoriteApplications = createSelector(
  selectAllApplications,
  apps => apps.filter(_ => _.favorite)
);

// public nonFavoriteApplications$ = this.filteredApplications$.pipe(
//   map(apps => apps.filter(app => !app.favorite))
// );
//
// public favoriteApplications$ = this.filteredApplications$.pipe(
//   map(apps => apps.filter(app => app.favorite))
// );
//
// public visibleApplications$: Observable<Application[]> = combineLatest(
//   this.favoriteApplications$,
//   this.nonFavoriteApplications$
// ).pipe(map(([favorites, nonFavorites]) => [...favorites, ...nonFavorites]));

export const selectApplicationLoaded = createSelector(
  state,
  state => state.loaded
);
export const selectSelectedApplication = createSelector(
  selectApplicationsEntities,
  selectRouterState,
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
export const selectApplicationsByNames = (names: string[]) =>
  createSelector(selectApplicationsEntities, dict =>
    names.map(name => dict[name])
  );
