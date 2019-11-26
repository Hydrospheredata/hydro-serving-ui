import { Injectable } from '@angular/core';
import { HydroServingState } from '@core/store';
import { Store } from '@ngrx/store';
import { selectServablesByModelVersionId } from '@servables/selectors';

@Injectable({
  providedIn: 'root',
})
export class ServablesFacade {
  constructor(private store: Store<HydroServingState>) {}

  getServablesByModelVersionId = (modelVersionId: number) => {
    return this.store.select(selectServablesByModelVersionId(modelVersionId));
  }
}
