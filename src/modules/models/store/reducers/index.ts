import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromModelVersions from './model-version.reducer';
import * as fromModels from './models.reducer';

export interface State {
  models: fromModels.State;
  modelVersions: fromModelVersions.State;
}

export const reducer: ActionReducerMap<State> = {
  models: fromModels.reducer,
  modelVersions: fromModelVersions.reducer,
};

export const getFeatureState = createFeatureSelector<State>('models');
