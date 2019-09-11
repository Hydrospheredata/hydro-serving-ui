import {
  GenerateInputSuccess,
  TestSuccess,
  TestFail,
  Test,
  SetInputSuccess,
  ClearTestingDialog,
} from '@applications/store/actions';
import { Action, createReducer, on, ActionReducerMap, combineReducers } from '@ngrx/store';
import { TestStatus } from '@shared/_index';
interface TestingDialogState {
  input: any;
  output: any;
  status: any;
  timestamp: any;
  error: string;
}

export interface State {
  testingDialog: TestingDialogState;
}

const initialTestingDialog: TestingDialogState = {
  input: null,
  output: null,
  status: null,
  timestamp: null,
  error: null,
};

const initialState: State = {
  testingDialog: initialTestingDialog,
};

const testingDialogReducer = createReducer(
  initialTestingDialog,
  on(ClearTestingDialog, () => initialTestingDialog),
  on(GenerateInputSuccess, SetInputSuccess, (state, { payload: { input } }) => ({
    ...state,
    input,
  })),
  on(Test, state => ({ ...state, status: TestStatus.Pending })),
  on(TestSuccess, (state, { payload: { output } }) => ({
    ...state,
    output,
    timestamp: Date.now(),
    error: null,
    status: TestStatus.Success,
  })),
  on(TestFail, (state, { payload: { error } }) => ({
    ...state,
    timestamp: Date.now(),
    error,
    status: TestStatus.Failed,
  }))
);

const reducerMap: ActionReducerMap<State> = {
  testingDialog: testingDialogReducer,
};
const combined = combineReducers(reducerMap, initialState);
export function reducer(state: State, action: Action): State {
  return combined(state, action);
}
