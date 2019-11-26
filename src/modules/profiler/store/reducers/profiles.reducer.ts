import { createReducer, on, Action } from '@ngrx/store';
import { GetProfilesSuccess, CleanProfiles } from '@profiler/store/actions';
import { Profiles } from '@shared/models/_index';
export interface State {
  profiles: Profiles | null;
}

const initialState: State = {
  profiles: null,
};

const profilesReducer = createReducer(
  initialState,
  on(GetProfilesSuccess, (state, { payload }) => ({
    ...state,
    profiles: payload,
  })),
  on(CleanProfiles, state => ({ ...state, profiles: null }))
);

export function reducer(state, action: Action): State {
  return profilesReducer(state, action);
}
