import { ProfilesActions, ProfilesActionTypes } from "../actions";


export interface State {
  fields: Array<string>
}

export const initialState: State = {
  fields: []
};

export function reducer(state = initialState, action: ProfilesActions) {
  switch (action.type) {
    case ProfilesActionTypes.GetFieldsSuccess:
    return {
      fields: action.payload
    }

    default:
      return state;
  }
}
