import { Model } from '@shared/_index';
import * as ModelActions from '@shared/actions/_index';
import { ModelBuilder } from '@shared/builders/_index';

const initialState: Model[] = [];


export function ModelsReducer(state = initialState, action: ModelActions.ModelActions) {
  switch (action.type) {
    case ModelActions.GET_MODELS:
      return Object.assign([], state, action.payload);
    case ModelActions.ADD_MODEL:
      return [
        ...state.slice(0),
        action.payload
      ];
    case ModelActions.UPDATE_MODEL:
      return state.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return {
          ...item,
          ...action.payload
        };
      });
    case ModelActions.DELETE_MODEL:
      return state.filter(service => service.id !== +action.modelId);
    default:
      return state;
  }
}
