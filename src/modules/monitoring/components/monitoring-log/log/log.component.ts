import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.scss'],
})
export class LogComponent implements OnChanges {
  selectedIndex: number;
  @Input() modelVersion: ModelVersion;
  @Input() checks: Check[] = [];
  @Input() loading: boolean = false;
  selectItem(index: number) {
    this.selectedIndex = index;
  }

  get selectedCheck(): Check {
    return this.checks[this.selectedIndex];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checks && changes.checks.currentValue) {
      const checks = changes.checks.currentValue;
      if (checks && checks.length) {
        this.selectItem(0);
      }
    }
  }

  isFailed(check: Check): boolean {
    return check._hs_overall_score === 0;
  }

  get haveSomeData(): boolean {
    return this.checks !== null && this.checks.length > 0;
  }
}
