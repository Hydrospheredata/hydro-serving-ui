import {
  MonitoringActions,
  MonitoringActionTypes,
} from '@core/actions/monitoring.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { MetricSpecification } from '@shared/models/metric-specification.model';

export interface MState extends EntityState<MetricSpecification> {
  loading: boolean;
  error: string;
  byModel: string[];
}

export const adapter: EntityAdapter<MetricSpecification> = createEntityAdapter<
  MetricSpecification
>({
  selectId: (metricSettings: MetricSpecification) => metricSettings.id,
});

export const initialState: MState = adapter.getInitialState({
  loading: false,
  error: null,
  byModel: [],
});

export function reducer(state = initialState, action: MonitoringActions) {
  switch (action.type) {
    case MonitoringActionTypes.AddMetricSuccess:
      return adapter.addOne(action.payload, state);
    case MonitoringActionTypes.EditMetricSuccess:
      return adapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    case MonitoringActionTypes.GetMetrics:
      return { ...state, loading: true };
    case MonitoringActionTypes.GetMetricsFail:
      return { ...state, error: action.error, loading: false };

    case MonitoringActionTypes.GetMetricsSuccess:
      return adapter.upsertMany(action.payload, { ...state, loading: false });

    case MonitoringActionTypes.DeleteMetricSuccess:
      return adapter.removeOne(action.payload.id, state);

    default: {
      return state;
    }
  }
}
