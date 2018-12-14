import { SignaturesActionTypes, SignaturesActions } from '@core/actions';
import { Signature } from '@shared/models/_index';

const initialState: Signature[] = [];

export function SignaturesReducer(state = initialState, action: SignaturesActions) {
    switch (action.type) {
        case SignaturesActionTypes.GetModelVersionSignaturesSuccess:
            let signatures;
            if (action.signatures.length === 0) {
                signatures = initialState;
            } else {
                signatures = Object.assign([], state, action.signatures);
            }
            return signatures;
        default:
            return state;
    }
}
