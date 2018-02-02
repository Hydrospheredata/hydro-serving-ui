// import { Application } from '@shared/models/_index';
import * as Actions from '@shared/actions/_index';



const initialState: any[] = [];

export function BuildsReducer (state = initialState, action: Actions.ModelActions) {
    switch (action.type) {
        case Actions.GET_BUILDS_SUCCESS:
            return Object.assign([], state, action.payload);
        // case Actions.ADD_BUILD_SUCCESS:
        //     return [
        //         ...state.slice(0),
        //         action.payload
        //     ];
        // case Actions.UPDATE_BUILDS_SUCCESS:
        //     return state.map(item => {
        //         if (item.id !== action.payload.id) {
        //             return item;
        //         }

        //         return {
        //             ...item,
        //             ...action.payload
        //         };
        //     });
        default:
            return state;
    }
}
