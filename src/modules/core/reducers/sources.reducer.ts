import * as Actions from '@core/actions';
import { Source } from '@shared/models/_index';

const initialState: Source[] = [];

export function SourcesReducer(state = initialState, action: Actions.SourcesActions) {
    switch (action.type) {
        case Actions.GET_SOURCES_SUCCESS:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
