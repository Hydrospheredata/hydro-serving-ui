import { Component } from '@angular/core';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';
import { AddComparableFacade } from './add-comparable.facade';

@Component({
  templateUrl: 'add-comparable.component.html',
  styleUrls: ['./add-comparable.component.scss'],
  providers: [AddComparableFacade],
})
export class AddComparableComponent {
  modelVersions$: Observable<ModelVersion[]>;
  constructor(private facade: AddComparableFacade) {
    this.modelVersions$ = this.facade.modelVersions$;
  }

  onSelectModelVersion(modelVersion: ModelVersion): void {
    this.facade.onSelectModelVersion(modelVersion);
  }

  onFilterChange(str: string): void {
    this.facade.onFilterChange(str);
  }
}
