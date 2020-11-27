import { ClearMonitoringPage } from '../actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { MetricSpecification } from '@app/core/data/types';
import {
  AddMetricSuccess,
  LoadMetricsSuccess,
  LoadMetricsFail,
  DeleteMetricSuccess,
} from '../actions/metrics.actions';

export interface State extends EntityState<MetricSpecification> {
  error: string;
}

export const adapter: EntityAdapter<MetricSpecification> = createEntityAdapter<
  MetricSpecification
>();

const initialState: State = adapter.getInitialState({
  error: null,
});

const metricsReducer = createReducer(
  initialState,
  on(AddMetricSuccess, (state, action) =>
    adapter.addOne(action.payload, state)
  ),
  on(LoadMetricsSuccess, (state, action) =>
    adapter.upsertMany(action.payload, state)
  ),
  on(LoadMetricsFail, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
  })),
  on(DeleteMetricSuccess, (state, action) =>
    adapter.removeOne(action.payload.id, state)
  ),
  on(ClearMonitoringPage, () => initialState)
);

export function reducer(state = initialState, action: Action): State {
  return metricsReducer(state, action);
}

export const {
  selectAll: selectAllMetrics,
  selectEntities: selectAllMetricsEntities,
  selectIds: selectAllMetricsIds,
} = adapter.getSelectors();
