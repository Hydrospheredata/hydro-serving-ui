import { EntityState, createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { MonitoringDictionary } from "@shared/models/monitoring-dictionary.model";
import { MonitoringActions, MonitoringActionTypes } from "@core/actions/monitoring.actions";


export interface State extends EntityState<MonitoringDictionary> { };

export const adapter: EntityAdapter<MonitoringDictionary> = createEntityAdapter<MonitoringDictionary>();

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: MonitoringActions): State {
    switch (action.type) {
        case MonitoringActionTypes.GetDictionarySuccess: {
            return adapter.addAll(action.dictionary, state);
        }

        default: {
            return state;
        }
    }
}
