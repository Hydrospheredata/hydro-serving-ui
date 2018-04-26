import { Signature } from '@shared/models/_index';
import { SignaturesActionTypes, SignaturesActions } from '@shared/actions/_index';



const initialState: Signature[] = [];

export function SignaturesReducer(state = initialState, action: SignaturesActions) {
    switch (action.type) {
        case SignaturesActionTypes.GetSignaturesSuccess:
        case SignaturesActionTypes.GetModelBuildSignaturesSuccess:
            let signatures;
            if (action.signatures.length === 0) {
                signatures = initialState;
            } else {
                signatures = Object.assign([], state, action.signatures);
            }
            console.log(signatures);
            return signatures;
        default:
            return state;
    }
}
