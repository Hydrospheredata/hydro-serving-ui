import { Signature } from '@shared/models/_index';
import { SignaturesActionTypes, SignaturesActions } from '@core/actions';



const initialState: Signature[] = [];

export function SignaturesReducer(state = initialState, action: SignaturesActions) {
    switch (action.type) {
        case SignaturesActionTypes.GetSignaturesSuccess:
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
