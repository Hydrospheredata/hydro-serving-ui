import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { neitherNullNorUndefined } from '@app/utils';

import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ModelVersionStatus, ModelVersion, Model } from '@app/core/data/types';

import {
  selectAllModelVersions,
  selectFirstModel,
  selectModelsLoaded,
} from '@app/core/store/selectors';
import { HydroServingState } from '../store/states/root.state';
import {
  GetModels,
  DeleteModel,
  ToggleFavorite,
} from '../store/actions/models.actions';

import {
  selectAllModels,
  selectSelectedModel,
  selectNonMetricModels,
} from '../store/selectors/models.selectors';

@Injectable({ providedIn: 'root' })
export class ModelsFacade {
  constructor(private readonly store: Store<HydroServingState>) {}

  loadAll(): void {
    this.store.dispatch(GetModels());
  }

  deleteModel(modelId: number): void {
    this.store.dispatch(DeleteModel({ modelId }));
  }

  allModels(): Observable<Model[]> {
    return this.store.pipe(select(selectAllModels));
  }

  firstModel(): Observable<Model> {
    return this.store.pipe(select(selectFirstModel));
  }

  selectedModel(): Observable<Model> {
    return this.store
      .pipe(select(selectSelectedModel))
      .pipe(neitherNullNorUndefined);
  }

  nonMetricModels(): Observable<Model[]> {
    return this.store.pipe(select(selectNonMetricModels));
  }

  someModelVersionIsReleased(): Observable<boolean> {
    return this.store.pipe(
      select(selectAllModelVersions),
      map(modelVersions =>
        modelVersions.some(
          ({ status }) => status === ModelVersionStatus.Released
        )
      )
    );
  }

  selectedModelVersions(): Observable<ModelVersion[]> {
    const selectedModel$ = this.selectedModel();
    const selectedModelVersions$ = this.store.pipe(
      select(selectAllModelVersions)
    );

    return combineLatest([selectedModel$, selectedModelVersions$]).pipe(
      map(([model, modelVersions]) => {
        return modelVersions.filter(mv => mv.model.id === model.id);
      })
    );
  }

  toggleFavorite(model: Model) {
    this.store.dispatch(ToggleFavorite({ model }));
  }

  areModelsLoaded(): Observable<boolean> {
    return this.store.pipe(select(selectModelsLoaded));
  }
}
