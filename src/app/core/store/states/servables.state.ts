import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';
import { Servable } from '../../data/types';

export interface State extends EntityState<Servable> {
  loading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<Servable>({
  selectId: servable => servable.fullName,
});

export const initialState = {
  ids: [],
  entities: {},
  loading: false,
  error: null,
};
