import { Injectable } from '@angular/core';
import { FavoriteStorageLocal } from '@core/services/favorite-storage-local.service';
import { DeleteModel, ToggleFavorite } from '@models/store/actions';
import {
  selectSelectedModelVersion,
  selectSiblingModelVersions,
  selectAllModelVersionsByModelId,
  selectAllModelVersions,
  selectAllModels,
  selectSelectedModel,
  selectModelVersionById,
} from '@models/store/selectors';
import { Store, select } from '@ngrx/store';
import { ProfilerFacade } from '@profiler/store';
import { ServablesFacade } from '@servables/servables.facade';
import { ModelVersionStatus, Model } from '@shared/_index';
import { isEmpty } from 'lodash';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import {
  filter,
  switchMap,
  map,
  publish,
  refCount,
  startWith,
} from 'rxjs/operators';
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

  allModels$ = this.store.pipe(select(selectAllModels));
  // !TODO move
  filterString$ = new BehaviorSubject('');
  filteredModels$ = combineLatest(this.allModels$, this.filterString$).pipe(
    map(([models, filterStr]) => {
      let filtered: Model[] = models;
      if (filterStr) {
        filtered = models.filter(model => model.name.includes(filterStr));
      }
      return filtered;
    })
  );

  nonFavoriteModels$: Observable<Model[]> = this.filteredModels$.pipe(
    map(models => models.filter(model => !model.favorite))
  );

  favoriteModels$: Observable<Model[]> = this.filteredModels$.pipe(
    map(models => models.filter(model => model.favorite))
  );

  allModelVersions$ = this.store.pipe(select(selectAllModelVersions));

  someModelVersionIsReleased$ = this.store.pipe(
    select(selectAllModelVersions),
    map(modelVersions =>
      modelVersions.some(({ status }) => status === ModelVersionStatus.Released)
    )
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

  signature$ = combineLatest(this.selectedModelVersion$).pipe(
    map(([modelVersion]) => modelVersion.modelContract.predict)
  );

  fields$ = this.selectedModelVersion$.pipe(
    switchMap(({ id }) => {
      return this.profilerFacade.loadFields(id);
    }),
    publish(),
    refCount(),
    startWith([])
  );

  // TODO: rewrite

  groupedFieldNames$: Observable<{
    [uniqName: string]: string[];
  }> = this.fields$.pipe(
    map(fields => {
      return fields.reduce((res, fieldName) => {
        const regex = new RegExp(/\_\d$/, 'g');
        const postfix = regex.exec(fieldName);

        let name = fieldName;

        if (postfix) {
          name = fieldName.slice(0, postfix.index);
        }

        if (res[name] === undefined) {
          res[name] = [];
        }

        res[name].push(fieldName);

        return res;
      }, {});
    })
  );

  selectedFeatureNames$ = combineLatest(
    this.groupedFieldNames$,
    this.profilerFacade.selectedFeatureName$
  ).pipe(
    map(([mappedNames, featureName]) => {
      return mappedNames[featureName as string] || [];
    })
  );

  signatureWithFieldNames$ = combineLatest(
    this.groupedFieldNames$,
    this.signature$
  ).pipe(
    map(([fields, signatures]) => {
      let mapped = signatures;

      if (!isEmpty(fields)) {
        mapped = {
          ...mapped,
          inputs: mapped.inputs.map(field => {
            const nf = { ...field, profileNames: [] };

            if (fields[field.name]) {
              nf.profileNames = fields[field.name];
            }

            return nf;
          }),
          outputs: mapped.outputs.map(field => {
            const nf = { ...field, profileNames: [] };

            if (fields[field.name]) {
              nf.profileNames = fields[field.name];
            }

            return nf;
          }),
        };
      }

      return mapped;
    })
  );

  profiles$ = combineLatest(
    this.selectedModelVersion$,
    this.profilerFacade.selectedFeatureName$
  ).pipe(
    switchMap(([modelVer, featureName]) => {
      return this.profilerFacade.loadProfiles(modelVer.id, featureName);
    })
  );

  constructor(
    private store: Store<State>,
    private servablesFacade: ServablesFacade,
    private profilerFacade: ProfilerFacade,
    private favoriteStorage: FavoriteStorageLocal
  ) {}

  selectModelVersionById$ = id =>
    this.store.pipe(select(selectModelVersionById(id)));

  modelVersionsByModelId(id: number) {
    return this.store.pipe(select(selectAllModelVersionsByModelId(id)));
  }

  deleteModel(id: number): void {
    this.store.dispatch(DeleteModel({ modelId: id }));
  }

  toggleFavorite(model: Model) {
    this.store.dispatch(ToggleFavorite({ model }));

    if (model.favorite) {
      this.favoriteStorage.remove(model.name);
    } else {
      this.favoriteStorage.add(model.name);
    }
  }
}
