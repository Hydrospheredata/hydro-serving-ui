import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromApplications from './applications.reducer';
import * as fromUI from './ui.reducer';

export interface State {
  db: fromApplications.State;
  ui: fromUI.State;
}

export const reducer: ActionReducerMap<State> = {
  db: fromApplications.reducer,
  ui: fromUI.reducer,
};

export const selectApplicationState = createFeatureSelector<State>(
  'applications'
);
