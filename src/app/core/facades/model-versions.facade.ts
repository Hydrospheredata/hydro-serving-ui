import { Injectable } from '@angular/core';
import { neitherNullNorUndefined } from '@app/utils';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ModelVersion } from '@app/core/data/types';
import { HydroServingState } from '@app/core/store/states/root.state';

import {
  selectSiblingModelVersions,
  selectSelectedModelVersion,
  selectAllModelVersions,
  selectAllModelVersionsByModelId,
  selectModelVersionById,
  selectModelVersionsLoaded,
  selectModelVersionEntities,
} from '../store/selectors/model-versions.selectors';

import { GetModelVersions } from '../store/actions/model-versions.actions';

@Injectable({ providedIn: 'root' })
export class ModelVersionsFacade {
  constructor(private readonly store: Store<HydroServingState>) {}

  loadAll(): void {
    this.store.dispatch(GetModelVersions());
  }

  allModelVersions(): Observable<ModelVersion[]> {
    return this.store.pipe(select(selectAllModelVersions));
  }

  allModelVersionsEntities() {
    return this.store.pipe(select(selectModelVersionEntities));
  }

  selectedModelVersion(): Observable<ModelVersion> {
    return this.store.pipe(
      select(selectSelectedModelVersion),
      neitherNullNorUndefined
    );
  }

  siblingModelVersions(): Observable<any> {
    return this.selectedModelVersion().pipe(
      neitherNullNorUndefined,
      switchMap(({ model: { id: modelId }, id: modelVersionId }) =>
        this.store.pipe(
          select(selectSiblingModelVersions({ modelId, modelVersionId }))
        )
      )
    );
  }

  modelVersionById(id: string): Observable<ModelVersion> {
    return this.store.pipe(select(selectModelVersionById(id)));
  }

  modelVersionsByModelId(id: number) {
    return this.store.pipe(select(selectAllModelVersionsByModelId(id)));
  }

  areModelVersionsLoaded(): Observable<boolean> {
    return this.store.pipe(select(selectModelVersionsLoaded));
  }
}
