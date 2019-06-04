import { MonitoringActions, MonitoringActionTypes } from '@core/actions/monitoring.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { MetricSpecification } from '@shared/models/metric-specification.model';

export interface MState extends EntityState<MetricSpecification> {
    byModel: string[];
}

export const adapter: EntityAdapter<MetricSpecification> = createEntityAdapter<MetricSpecification>({
    selectId: (metricSettings: MetricSpecification) => metricSettings.id,
});

export const initialState: MState = adapter.getInitialState({
    byModel: [],
});

export function reducer(state = initialState, action: MonitoringActions) {
    switch (action.type) {
        case MonitoringActionTypes.AddMetricSuccess:
            return adapter.addOne(action.payload, state);

        case MonitoringActionTypes.GetMetricsFail:
            return action.error;

        case MonitoringActionTypes.GetMetricsSuccess:
            return adapter.upsertMany(action.payload, state);

        case MonitoringActionTypes.DeleteMetricSuccess:
            return adapter.removeOne(action.payload.id, state);

        default: {
            return state;
        }
    }
}
