import { Signature } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';



const initialState: Signature[] = [];

export function ContractsReducer(state = initialState, action: Actions.ContractsActions) {
    switch (action.type) {
        // case Actions.GET_MODEL_CONTRACTS_SUCCESS:
        //     return Object.assign([], state, action.payload);
        case Actions.GET_MODEL_BUILD_CONTRACTS_SUCCESS:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
