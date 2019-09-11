import { Injectable } from '@angular/core';
import { DeleteModel } from '@models/store/actions';
import {
  selectSelectedModelVersion,
  selectSiblingModelVersions,
  selectAllModelVersionsByModelId,
  selectAllModelVersions,
  selectAllModels,
  selectSelectedModel,
} from '@models/store/selectors';
import { Store, select } from '@ngrx/store';
import { ServablesFacade } from '@servables/servables.facade';
import { ModelVersionStatus } from '@shared/_index';
import { filter, switchMap, map, share } from 'rxjs/operators';
import { State } from './reducers';

@Injectable({
  providedIn: 'root',
})
export class ModelsFacade {
  selectedModelVersion$ = this.store.pipe(
    select(selectSelectedModelVersion),
    filter(val => val !== undefined)
  );
  siblingModelVersions$ = this.selectedModelVersion$.pipe(
    switchMap(({ model: { id: modelId }, id: modelVersionId }) =>
      this.store.pipe(
        select(selectSiblingModelVersions({ modelId, modelVersionId }))
      )
    ),
    filter(modelVersions => modelVersions !== undefined),
    map(modelVersions => {
      return modelVersions.filter(
        mv => mv.status === ModelVersionStatus.Released
      );
    })
  );

  allModels$ = this.store.pipe(
    select(selectAllModels),
    share()
  );

  allModelVersions$ = this.store.pipe(
    select(selectAllModelVersions),
    share()
  );

  someModelVersionIsReleased$ = this.store.pipe(
    select(selectAllModelVersions),
    map(modelVersions => {
      return modelVersions.some(
        modelVersion => modelVersion.status === ModelVersionStatus.Released
      );
    })
  );

  selectedModel$ = this.store.pipe(
    select(selectSelectedModel),
    filter(val => val !== undefined)
  );

  selectedModelVersions$ = this.selectedModel$.pipe(
    switchMap(({ id }) => this.modelVersionsByModelId(id))
  );

  selectedServables$ = this.selectedModelVersion$.pipe(
    switchMap(({ id }) => this.servablesFacade.getServablesByModelVersionId(id))
  );

  constructor(
    private store: Store<State>,
    private servablesFacade: ServablesFacade
  ) {}

  modelVersionsByModelId(id: number) {
    return this.store.pipe(select(selectAllModelVersionsByModelId(id)));
  }

  deleteModel(id: number): void {
    this.store.dispatch(DeleteModel({ modelId: id }));
  }
}
