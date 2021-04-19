import { createReducer, Action, on } from '@ngrx/store';
import { TestStatus } from '@app/core/data/types';

import {
  Get,
  GetSuccess,
  GetFail,
  AddSuccess,
  UpdateSuccess,
  SetInputSuccess,
  GenerateInputSuccess,
  Test,
  TestSuccess,
  TestFail,
  DeleteSuccess,
  ToggleFavorite,
} from '../actions/applications.actions';

import { adapter, State, initialState } from '../states/applications.state';

const applicationReducer = createReducer(
  initialState,
  on(Get, state => ({ ...state, loading: true })),
  on(GetSuccess, (state, { payload }) =>
    adapter.setAll(payload, { ...state, loaded: true, loading: false })
  ),
  on(GetFail, state => ({ ...state, loading: false })),
  on(AddSuccess, (state, { payload }) => adapter.addOne(payload, state)),
  on(UpdateSuccess, (state, { payload }) => adapter.upsertOne(payload, state)),
  on(
    SetInputSuccess,
    GenerateInputSuccess,
    (state, { payload: { name, input } }) =>
      adapter.updateOne(
        {
          id: name,
          changes: {
            input,
          },
        },
        state
      )
  ),
  on(Test, (state, { payload: { name } }) =>
    adapter.updateOne(
      {
        id: name,
        changes: {
          testStatus: TestStatus.Pending,
          error: '',
        },
      },
      state
    )
  ),
  on(TestSuccess, (state, { payload: { name, output } }) =>
    adapter.updateOne(
      {
        id: name,
        changes: {
          output,
          error: '',
          testStatus: TestStatus.Success,
        },
      },
      state
    )
  ),
  on(TestFail, (state, { payload: { name, error } }) =>
    adapter.updateOne(
      {
        id: name,
        changes: {
          testStatus: TestStatus.Failed,
          output: '',
          error,
        },
      },
      state
    )
  ),
  on(DeleteSuccess, (state, { applicationName }) =>
    adapter.removeOne(applicationName, state)
  ),
  on(
    ToggleFavorite,
    (
      state,
      {
        payload: {
          application: { name, favorite },
        },
      }
    ) => {
      return adapter.updateOne(
        { id: name, changes: { favorite: !favorite } },
        state
      );
    }
  )
);

export function reducer(state: State, action: Action): State {
  return applicationReducer(state, action);
}

export const {
  selectEntities: selectApplicationEntities,
  selectAll: selectAllApplications,
  selectTotal: selectTotalApplications,
} = adapter.getSelectors();
