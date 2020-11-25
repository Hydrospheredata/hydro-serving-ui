import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';
import { Observable } from '@node_modules/rxjs';

@Component({
  templateUrl: './profiler-page.component.html',
  styleUrls: ['profiler-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilerPageComponent {
  readonly modelVersion: Observable<ModelVersion>;

  constructor() {}
}
