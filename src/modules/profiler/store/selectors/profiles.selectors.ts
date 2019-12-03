import { selectRouterParams } from '@core/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProfiler from '../reducers';

const profilerState = createFeatureSelector<fromProfiler.ProfilerState>(
  'profiler'
);

export const selectProfilesEntitiesState = createSelector(
  profilerState,
  state => state.profiles
);

export const selectFieldsEntitiesState = createSelector(
  profilerState,
  state => state.fields
);

export const selectSelectedFeatureName = createSelector(
  selectRouterParams,
  router => router && router.params && router.params.featureName
);
