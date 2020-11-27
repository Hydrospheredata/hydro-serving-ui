import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComparisonRegime } from '@app/modules/monitoring/containers/custom-metrics/custom-metrics.facade';

@Component({
  selector: 'hs-regime-selector',
  template: '',
})
export class RegimeSelectorComponent {
  @Input() selectedRegime: ComparisonRegime = 'split';
  @Output() changedRegime: EventEmitter<any> = new EventEmitter();
}
