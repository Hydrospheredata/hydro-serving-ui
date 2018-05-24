import { Application } from '@shared/models/_index';
import { ApplicationActions, ApplicationActionTypes } from '@applications/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Application> { }

export const adapter: EntityAdapter<Application> = createEntityAdapter<Application>({
    selectId: (application: Application) => application.id,
});

export const initialState: State = adapter.getInitialState()

export function reducer(state = initialState, action: ApplicationActions): State {
    switch (action.type) {
        case ApplicationActionTypes.GetSuccess:
            return adapter.addAll(action.payload, state);
        case ApplicationActionTypes.GetFail:
            return { ...state };
        case ApplicationActionTypes.AddSuccess:
            return adapter.addOne(action.payload, state);
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
            return adapter.removeOne(action.applicationId, state);
        default:
            return state;
    }
}

export const getIds = (state: State) => state.ids;
