import { Signature } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';



const initialState: Signature[] = [];

export function ContractsReducer (state = initialState, action: Actions.ContractsActions) {
    switch (action.type) {
        case Actions.GET_CONTRACTS_SUCCESS:
            return Object.assign([], state, action.payload);
        default:
            return state;
    }
}
