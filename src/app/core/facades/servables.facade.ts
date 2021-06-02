import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Servable } from '@app/core/data/types';
import {
  selectAllServables,
  selectServableByName,
} from '@app/core/store/selectors/servables.selectors';
import { HydroServingState } from '@app/core/store/states/root.state';
import { getAll } from '../store/actions/servables.actions';

@Injectable({
  providedIn: 'root',
})
export class ServablesFacade {
  constructor(private readonly store: Store<HydroServingState>) {}

  loadAll(): void {
    this.store.dispatch(getAll());
  }

  allServables(): Observable<Servable[]> {
    return this.store.pipe(select(selectAllServables));
  }

  selectServableByName(name: string): Observable<Servable[]> {
    return this.store.pipe(select(selectServableByName(name)));
  }
}
