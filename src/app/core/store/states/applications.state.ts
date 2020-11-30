import { EntityState, createEntityAdapter } from '@ngrx/entity';
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
  ids: [],
  entities: {},
  loaded: false,
  loading: false,
};
