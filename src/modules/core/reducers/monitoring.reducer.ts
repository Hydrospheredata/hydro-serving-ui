import { EntityState, createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { MonitoringActions, MonitoringActionTypes } from "@core/actions/monitoring.actions";
import { MetricSettings } from "@shared/models/metric-settings.model";
// import { getRouterState } from '@core/reducers';
// import { createFeatureSelector, createSelector } from "@ngrx/store";


export interface MState extends EntityState<MetricSettings> { };

export const adapter: EntityAdapter<MetricSettings> = createEntityAdapter<MetricSettings>({
    selectId: (metricSettings: MetricSettings) => metricSettings.id,
    sortComparer: (a, b) => ~~b.timestamp - ~~a.timestamp
});

export const initialState: MState = adapter.getInitialState();

export function reducer(state = initialState, action: MonitoringActions) {
    switch (action.type) {
        case MonitoringActionTypes.AddMetricSuccess:
            return adapter.addOne(action.payload, state);

        case MonitoringActionTypes.GetMetricsSuccess:
            return adapter.addAll(action.payload, state);

        case MonitoringActionTypes.DeleteMetricSuccess:
        return adapter.removeOne(action.payload.id, state);

        default: {
            return state;
        }
    }
}

// export interface MetricsState {
//     metrics: MState;
// }

// export interface State extends fromRoot.HydroServingState {
//     metrics: MetricsState
// }

// export const reducers: ActionReducerMap<MetricsState> = {
//     metrics: reducer
// }

