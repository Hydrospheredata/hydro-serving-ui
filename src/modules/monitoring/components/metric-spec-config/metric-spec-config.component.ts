import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Application } from '@shared/_index';

@Component({
  selector: 'hs-metric-spec-config',
  templateUrl: 'metric-spec-config.component.html',
  styleUrls: ['./metric-spec-config.component.scss'],
})
export class MetricSpecConfigComponent {
  @Input()
  parent: FormGroup;

  @Input()
  sources: string[];

  @Input()
  applications: Application[];
}
