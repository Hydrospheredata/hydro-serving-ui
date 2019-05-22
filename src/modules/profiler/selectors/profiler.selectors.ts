import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProfiler from '../reducers';

const profilerState = createFeatureSelector<fromProfiler.ProfilerState>('profiler');

const profilerServiceStatusState = createSelector(
    profilerState,
    state => state.profilerServiceStatus
);

export const selectProfilerServiceStatus = createSelector(
    profilerServiceStatusState,
    state => state.status
);

export const selectErrorMessage = createSelector(
    profilerServiceStatusState,
    state => state.errorMessage
);
