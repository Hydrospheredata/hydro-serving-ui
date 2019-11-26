import { createReducer, on, Action } from '@ngrx/store';
import {
  GetFieldsSuccess,
} from '../actions';

export interface State {
  fields: string[];
}

const initialState: State = {
  fields: [],
};

const fieldsReducer = createReducer(
  initialState,
  on(GetFieldsSuccess, (state, { payload }) => ({ ...state, fields: payload }))
);

export function reducer(state = initialState, action: Action): State {
  return fieldsReducer(state, action);
}
