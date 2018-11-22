import * as Actions from '@core/actions';
import { Runtime } from '@shared/models/_index';

const initialState: Runtime[] = [];

export function RuntimesReducer(state = initialState, action: Actions.RuntimeActions) {
    switch (action.type) {
        case Actions.GET_RUNTIMES_SUCCESS:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
