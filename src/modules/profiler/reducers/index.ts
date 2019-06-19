import * as fromFields from './fields.reducer';
import * as fromProfilerServiceStatus from './profiler-service-status.reducer';
import * as fromProfiles from './profiles.reducer';

export interface ProfilerState {
    profilerServiceStatus: fromProfilerServiceStatus.State;
    profiles: fromProfiles.State;
    fields: fromFields.State;
}

export const reducers = {
    profilerServiceStatus: fromProfilerServiceStatus.reducer,
    profiles: fromProfiles.reducer,
    fields: fromFields.reducer,
};
