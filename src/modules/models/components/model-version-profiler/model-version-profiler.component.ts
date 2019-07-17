import { Component } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { getSelectedModelVersionId } from '@models/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hs-profiler',
  templateUrl: './model-version-profiler.component.html',
})
export class ModelVersionProfilerComponent {
  modelVersionId$: Observable<number>;
  constructor(private store: Store<HydroServingState>) {
    this.modelVersionId$ = this.store
      .select(getSelectedModelVersionId)
      .pipe(filter(id => id));
  }
}
