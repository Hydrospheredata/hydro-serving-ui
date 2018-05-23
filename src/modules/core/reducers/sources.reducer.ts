import { Source } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';



const initialState: Source[] = [];

export function SourcesReducer (state = initialState, action: Actions.SourcesActions) {
    switch (action.type) {
        case Actions.GET_SOURCES_SUCCESS:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
