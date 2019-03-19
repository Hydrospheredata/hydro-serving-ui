import { MonitoringActions, MonitoringActionTypes } from '@core/actions/monitoring.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IMetricSpecification } from '@shared/models/metric-specification.model';

export interface MState extends EntityState<IMetricSpecification> {
    byModel: string[];
}

export const adapter: EntityAdapter<IMetricSpecification> = createEntityAdapter<IMetricSpecification>({
    selectId: (metricSettings: IMetricSpecification) => metricSettings.id,
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
            return adapter.addAll(action.payload, state);

        case MonitoringActionTypes.DeleteMetricSuccess:
            return adapter.removeOne(action.id, state);

        default: {
            return state;
        }
    }
}
