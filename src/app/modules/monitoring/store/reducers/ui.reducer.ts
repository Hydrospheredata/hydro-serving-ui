import { Action, createReducer, on } from '@node_modules/@ngrx/store';
import { ShowCheckDetails, CloseCheckDetails } from '../actions';

export interface State {
  checksIdToShow: string;
}

const initialState: State = {
  checksIdToShow: undefined,
};

const uiReducer = createReducer(
  initialState,
  on(ShowCheckDetails, (state, payload) => {
    return { ...state, checksIdToShow: payload.checkId };
  }),
  on(CloseCheckDetails, state => ({ ...state, checksIdToShow: undefined }))
);

export function reducer(state: State = initialState, action: Action): State {
  return uiReducer(state, action);
}
