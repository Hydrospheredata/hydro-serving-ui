import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModelsFacade } from '@models/store';
import { ProfilerFacade } from '@profiler/store';
import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

@Component({
  selector: 'hs-profiler',
  templateUrl: './model-version-profiler.component.html',
  styleUrls: ['model-version-profiler.component.scss'],
})
export class ModelVersionProfilerComponent {
  modelVersion$: Observable<ModelVersion> = this.modelsFacade
    .selectedModelVersion$;
  featureName$ = this.profilerFacade.selectedFeatureName$;
  featureNames$ = this.modelsFacade.selectedFeatureNames$;
  profiles$ = this.modelsFacade.profiles$;

  constructor(
    private profilerFacade: ProfilerFacade,
    private modelsFacade: ModelsFacade,
    private router: Router
  ) {}

  backToModelVersion(modelVersion: ModelVersion): void {
    this.router.navigate(
      ['models', modelVersion.model.id, modelVersion.id, 'details'],
      { queryParamsHandling: 'merge' }
    );
  }
}
