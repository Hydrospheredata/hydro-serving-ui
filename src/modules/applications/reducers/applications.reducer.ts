import { Application } from '@shared/models/_index';
import { ApplicationActions, ApplicationActionTypes } from '@applications/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Application> {
    selectedApplicationId: string | null;
}

export const adapter: EntityAdapter<Application> = createEntityAdapter<Application>();

export const initialState: State = adapter.getInitialState({
    selectedApplicationId: null,
})

export function reducer(state = initialState, action: ApplicationActions): State {
    switch (action.type) {
        case ApplicationActionTypes.GetSuccess:
            return adapter.addMany(action.payload, {
                ...state,
                selectedApplicationId: state.selectedApplicationId
            });
        // return { ...state, applications: action.payload };
        case ApplicationActionTypes.GetFail:
            return { ...state };
        case ApplicationActionTypes.AddSuccess:
            return adapter.addOne(action.payload, {
                ...state,
                selectedApplicationId: state.selectedApplicationId
            });
        case ApplicationActionTypes.UpdateSuccess:
            return state;
        // return {
        //     ...state,
        //     applications: [...state.applications.map(item => {
        //         if (item.id !== action.payload.id) {
        //             return item;
        //         }

        //         return { ...item, ...action.payload };
        //     })]
        // };
        case ApplicationActionTypes.DeleteSuccess:
            return state;
        // const index = state.applications.findIndex(application => application.id === action.applicationId);
        // return {
        //     ...state,
        //     applications: [...state.applications.slice(0, index), ...state.applications.slice(index + 1, state.applications.length)]
        // };
        default:
            return state;
    }
}

export const getSelectedId = (state: State) => state.selectedApplicationId;

export const getIds = (state: State) => state.ids;
