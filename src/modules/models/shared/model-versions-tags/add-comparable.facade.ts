import { Injectable } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { ModelsFacade } from '@models/store';
import { ModelVersion } from '@shared/_index';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelVersionsTagsFacade } from './model-versions-tags.facade';

@Injectable()
export class AddComparableFacade {
  modelVersions$: Observable<ModelVersion[]>;
  filteredModelVersions$: Observable<ModelVersion[]>;
  private filterString: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(
    private dialogService: DialogService,
    private modelsFacade: ModelsFacade,
    private facade: ModelVersionsTagsFacade
  ) {
    this.modelVersions$ = combineLatest(
      this.modelsFacade.allModelVersions$,
      this.filterString.asObservable()
    ).pipe(
      map(([allModelVersions, filter]) => {
        if (!filter) {
          return allModelVersions;
        } else {
          return allModelVersions.filter(({ model }) =>
            model.name.includes(filter)
          );
        }
      })
    );
  }

  onSelectModelVersion(modelVersion: ModelVersion): void {
    this.facade.add(modelVersion);
    this.dialogService.closeDialog();
  }

  onFilterChange(str: string = ''): void {
    this.filterString.next(str);
  }
}
