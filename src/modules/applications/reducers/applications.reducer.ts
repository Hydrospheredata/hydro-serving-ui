import { ApplicationActions, ApplicationActionTypes } from '@applications/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TestStatus, Application } from '@shared/models/_index';

export interface State extends EntityState<Application> {
    loading: boolean;
    loaded: boolean;
}

export const adapter: EntityAdapter<Application> = createEntityAdapter<Application>({
    selectId: (application: Application) => application.id,
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    loaded: false,
});

export function reducer(state = initialState, action: ApplicationActions): State {
    switch (action.type) {
        case ApplicationActionTypes.Get:
            return { ...state, loading: true };
        case ApplicationActionTypes.GetSuccess:
            return adapter.addAll(action.payload, {...state, loading: false, loaded: true });
        case ApplicationActionTypes.GetFail:
            return { ...state, loading: false };
        case ApplicationActionTypes.AddSuccess:
            return adapter.addOne(action.payload, state);
        case ApplicationActionTypes.UpdateSuccess:
            return adapter.updateOne({
                id: action.payload.id,
                changes: action.payload,
            }, state);
        case ApplicationActionTypes.SetInputSuccess:
        case ApplicationActionTypes.GenerateInputSuccess:
            console.log(action.payload);
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    input: action.payload.input,
                },
            }, state);
        case ApplicationActionTypes.Test: {
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    testStatus: TestStatus.Pending,
                    error: '',
                },
            }, state);
        }
        case ApplicationActionTypes.TestSuccess:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    output: action.payload.output,
                    error: '',
                    testStatus: TestStatus.Success,
                },
            }, state);
        case ApplicationActionTypes.TestFail:
            return adapter.updateOne({
                id: action.payload.id,
                changes: {
                    testStatus: TestStatus.Failed,
                    output: '',
                    error: action.payload.error,
                },
            }, state);
        case ApplicationActionTypes.DeleteSuccess:
            return adapter.removeOne(action.applicationId, state);
        default:
            return state;
    }
}

export const getIds = (state: State) => state.ids;
