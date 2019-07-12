import { EntityState } from '@ngrx/entity';
import { Servable } from '../models';

export interface State extends EntityState<Servable> {
  loading: boolean;
  error: string;
}
