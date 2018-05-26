import { DialogActionTypes, DialogActions } from '@core/actions';

export interface State {

};

const initialState: State = {

};

export function reducer(state = initialState, action: DialogActions): State {
    switch (action.type) {
        case DialogActionTypes.OpenDialog: {
            return state;
        }
        case DialogActionTypes.CloseDialog: {
            return state;
        }

        default: {
            return state;
        }
    }
}