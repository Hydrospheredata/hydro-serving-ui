import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ModelVersion,
  ModelVersionServiceStatusesEntity,
} from '@app/core/data/types';
import { HydroServingState } from '@app/core/store/states/root.state';
import { Get } from '@app/core/store/actions/service-statuses.actions';
import {
  selectServiceStatusesById,
  allStatusesEntities,
} from '@app/core/store/selectors/service-statuses.selectors';

@Injectable({ providedIn: 'root' })
export class ServiceStatusesFacade {
  constructor(private readonly store: Store<HydroServingState>) {}

  loadAll(modelVersion: ModelVersion): void {
    this.store.dispatch(Get({ payload: modelVersion }));
  }

  allStatusesEntities() {
    return this.store.pipe(select(allStatusesEntities));
  }

  selectServiceStatusesById(
    id: number
  ): Observable<ModelVersionServiceStatusesEntity> {
    return this.store.pipe(select(selectServiceStatusesById(id)));
  }
}
