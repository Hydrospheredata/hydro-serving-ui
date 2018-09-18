import { ModelBuild } from '@shared/models/_index';
import { ModelBuildsActions, ModelBuildsActionTypes } from '@models/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<ModelBuild> {
    loading: boolean,
    loaded: boolean
 }

export const adapter: EntityAdapter<ModelBuild> = createEntityAdapter<ModelBuild>();

export const initialState: State = adapter.getInitialState({
    loading: false,
    loaded:false
})

export function reducer(state = initialState, action: ModelBuildsActions) {
    switch (action.type) {
        case ModelBuildsActionTypes.GetBuilds:
            return {...state, loading: true, loaded: false };
        case ModelBuildsActionTypes.GetBuildsSuccess:
            return adapter.addAll(action.payload, {...state, loading: false, loaded: true});
        case ModelBuildsActionTypes.GetBuildsFail: 
            return { ...state, loading: false };
        default:
            return state;
    }
}
