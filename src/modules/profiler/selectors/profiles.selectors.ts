import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProfiler from '../reducers';

const profilerState = createFeatureSelector<fromProfiler.ProfilerState>('profiler');

export const getProfilesEntitiesState = createSelector(
    profilerState,
    state => state.profiles
);

export const getFieldsEntitiesState = createSelector(
    profilerState,
    state => state.fields
);
