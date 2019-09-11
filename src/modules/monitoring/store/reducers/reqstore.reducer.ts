import { LoadReqstoreDataSuccess } from '@monitoring/store/actions';
import { createReducer, Action, on } from '@ngrx/store';
import { ReqstoreEntry } from '@shared/models/reqstore.model';

export interface State {
  [uid: string]: ReqstoreEntry[];
}

const initialState = undefined;
const reqstoreReducer = createReducer(
  initialState,
  on(LoadReqstoreDataSuccess, (state, action) => {
    return action.reqstoreData;
  })
);

export function reducer(state: State, action: Action): State {
  return reqstoreReducer(state, action);
}
