import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './profiler-page.component.html',
  styleUrls: ['profiler-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilerPageComponent {
  readonly modelVersion: Observable<ModelVersion>;

  constructor() {}
}
