import { Component } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hs-profiler',
  templateUrl: './model-version-profiler.component.html',
})
export class ModelVersionProfilerComponent {
  modelVersionId$: Observable<number>;
  constructor(private modelsFacade: ModelsFacade) {
    this.modelVersionId$ = this.modelsFacade.selectedModelVersion$.pipe(
      map(modelVersion => modelVersion.id)
    );
  }
}
