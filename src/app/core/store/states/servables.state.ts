import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@node_modules/@ngrx/entity';
import { Servable } from '../../data/types';

export interface State extends EntityState<Servable> {
  loading: boolean;
  error: string;
}

export const adapter = createEntityAdapter<Servable>({
  selectId: servable => servable.fullName,
});

export const initialState = {
  ...adapter.getInitialState(),
  loading: false,
  error: null,
};
