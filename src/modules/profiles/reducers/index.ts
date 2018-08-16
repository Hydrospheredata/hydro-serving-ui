import { createSelector } from '@ngrx/store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromProfiles from './profiles.reducer';
import * as fromFields from './fields.reducer';
import * as fromRoot from '@core/reducers';

export interface ProfilesState {
  profiles: fromProfiles.State,
  fields: fromFields.State
}

export interface State extends fromRoot.HydroServingState {
  profiles: ProfilesState
}

export const reducers: ActionReducerMap<ProfilesState> = {
  profiles: fromProfiles.reducer,
  fields: fromFields.reducer
}

export const getProfilesState = createFeatureSelector<ProfilesState>('profiles')

export const getProfilesEntitiesState = createSelector(
  getProfilesState,
  state => state.profiles
)

export const getFieldsEntitiesState = createSelector(
  getProfilesState,
  state => state.fields
)