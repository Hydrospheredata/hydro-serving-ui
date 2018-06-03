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
            return adapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state);
        case ApplicationActionTypes.SetInputSuccess:
        case ApplicationActionTypes.GenerateInputSuccess:
            console.log(action.payload);
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    input: action.payload.input
                }
            }, state);
        case ApplicationActionTypes.TestSuccess:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    output: action.payload.output
                }
            }, state);
        case ApplicationActionTypes.DeleteSuccess:
            return adapter.removeOne(action.applicationId, state);
        case ApplicationActionTypes.AddMetricSuccess:
            console.log("updating");
            return { ...state };
        default:
            return state;
    }
}

export const getIds = (state: State) => state.ids;
