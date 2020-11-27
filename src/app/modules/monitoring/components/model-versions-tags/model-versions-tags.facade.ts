import { Injectable } from '@angular/core';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { ModelVersion } from '@app/core/data/types';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ModelVersionsTagsFacade {
  modelVersions$: Observable<ModelVersion[]>;
  private modelVersions: BehaviorSubject<ModelVersion[]> = new BehaviorSubject(
    []
  );
  constructor(private facade: ModelVersionsFacade) {
    this.modelVersions$ = this.modelVersions.asObservable();
  }
  add(modelVersion: ModelVersion): void {
    const currentList = this.modelVersions.getValue();
    this.modelVersions.next([...currentList, modelVersion]);
  }
  remove(modelVersion: ModelVersion): void {
    const currentList = this.modelVersions.getValue();
    this.modelVersions.next(
      currentList.filter(({ id }) => id !== modelVersion.id)
    );
  }

  idsToModelVersions$(ids: number[]): Observable<ModelVersion[]> {
    return this.facade
      .allModelVersionsEntities()
      .pipe(map(modelVersions => ids.map(id => modelVersions[id])));
  }
}
