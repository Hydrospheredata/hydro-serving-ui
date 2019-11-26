import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Model, ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-metric-spec-config',
  templateUrl: 'metric-spec-config.component.html',
  styleUrls: ['./metric-spec-config.component.scss'],
})
export class MetricSpecConfigComponent {
  @Input()
  parent: FormGroup;

  @Input()
  models: Model[];

  @Input()
  modelVersions: ModelVersion[];

  thresholdCmpOperators: Array<{ kind: string }> = [
    { kind: 'Eq' },
    { kind: 'NotEq' },
    { kind: 'Greater' },
    { kind: 'Less' },
    { kind: 'GreaterEq' },
    { kind: 'LessEq' },
  ];
}
