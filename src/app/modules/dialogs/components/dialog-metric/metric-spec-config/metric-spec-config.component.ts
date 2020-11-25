import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Model, ModelVersion } from '@app/core/data/types';
import { cmpOperators } from '@app/modules/monitoring/models';

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

  thresholdCmpOperators = cmpOperators;
}
