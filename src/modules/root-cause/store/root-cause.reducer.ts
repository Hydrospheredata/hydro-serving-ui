import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import { ExplanationJob, ExplanationJobStatus } from '@rootcause/models';
import * as rootCauseActions from './root-cause.actions';

export interface State extends EntityState<ExplanationJob> {}

const adapter: EntityAdapter<ExplanationJob> = createEntityAdapter({
  selectId: job => job.uid,
});
const initialState = adapter.getInitialState();

const rootCauseReducer = createReducer(
  initialState,
  on(rootCauseActions.QueueExplanationSuccess, (state, { job }) => {
    return adapter.upsertOne(job, state);
  }),
  on(rootCauseActions.JobPending, (state, {uid}) => {
    return adapter.updateOne({
      id: uid,
      changes: {
        jobStatus: ExplanationJobStatus.pending,
      },
    }, state);
  }),
  on(rootCauseActions.JobStarted, (state, {uid, progress}) => {
    return adapter.updateOne({
      id: uid,
      changes: {
        jobStatus: ExplanationJobStatus.started,
        progress,
      },
    }, state);
  }),
  on(rootCauseActions.JobFinished, (state, { uid, resultId }) => {
    return adapter.updateOne(
      {
        id: uid,
        changes: {
          resultId,
          jobStatus: ExplanationJobStatus.success,
        },
      },
      state
    );
  }),
  on(rootCauseActions.JobFailed, (state, { uid, error }) => {
    return adapter.updateOne(
      {
        id: uid,
        changes: {
          jobStatus: ExplanationJobStatus.failure,
          error,
        },
      },
      state
    );
  }),
  on(rootCauseActions.GetResultSuccess, (state, action) => {
    return adapter.updateOne(
      {
        id: action.uid,
        changes: {
          explanation: action.explanation,
        },
      },
      state
    );
  })
);

export function reducer(state: State, action: Action): State {
  return rootCauseReducer(state, action);
}

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllExplanationJobs = selectAll;
export const selectExplanationJobsEntities = selectEntities;
