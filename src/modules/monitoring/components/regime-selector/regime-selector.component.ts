import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComparisonRegime } from '@monitoring/containers/custom-metrics/custom-metrics.service';

@Component({
  selector: 'hs-regime-selector',
  templateUrl: './regime-selector.component.html',
  styleUrls: ['./regime-selector.component.scss'],
})
export class RegimeSelectorComponent {
  regimes: ComparisonRegime[] = ['split', 'merge'];
  @Input() selectedRegime: ComparisonRegime = 'split';
  @Output() changedRegime: EventEmitter<ComparisonRegime> = new EventEmitter();
  changeRegime(regime: ComparisonRegime): void {
    this.changedRegime.next(regime);
  }
}
