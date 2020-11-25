import { EntityState, createEntityAdapter } from '@node_modules/@ngrx/entity';
import { Application } from '../../data/types';

export interface State extends EntityState<Application> {
  loading: boolean;
  loaded: boolean;
}

export const adapter = createEntityAdapter<Application>({
  selectId: application => application.name,
  sortComparer: (a, b) => {
    return b.id - a.id;
  },
});

export const initialState: State = {
  ...adapter.getInitialState(),
  loaded: false,
  loading: false,
};
