import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ModelVersion } from '@app/core/data/types';
import { Observable, Subject } from 'rxjs';
import { AddComparableFacade } from './add-comparable.facade';

@Component({
  templateUrl: 'add-comparable.component.html',
  styleUrls: ['./add-comparable.component.scss'],
  providers: [AddComparableFacade],
})
export class AddComparableComponent implements OnDestroy, AfterViewInit {
  modelVerFilter = new FormControl();
  modelVersions$: Observable<ModelVersion[]>;

  private readonly destroy: Subject<any> = new Subject<any>();
  constructor(private facade: AddComparableFacade) {
    this.modelVersions$ = this.facade.modelVersions$;
  }

  ngAfterViewInit(): void {
    this.modelVerFilter.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(value => {
        this.facade.onFilterChange(value);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onSelectModelVersion(modelVersion: ModelVersion): void {
    this.facade.onSelectModelVersion(modelVersion);
  }

  onFilterChange(str: string): void {
    this.facade.onFilterChange(str);
  }
}
