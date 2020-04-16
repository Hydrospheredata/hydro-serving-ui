import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Check } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/models';
import { debug } from 'util';

@Component({
  selector: 'hs-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent implements OnChanges {
  selectedIndex: number;
  size: 'mini' | 'full' = 'full';
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
    return check._hs_overall_score < 1;
  }

  get haveSomeData(): boolean {
    return this.checks !== null && this.checks.length > 0;
  }

  get requestsSummaryInfo(): {
    count: number;
    failed: number;
    success: number;
  } {
    const checks = this.checks;
    const count = checks.length;
    const success = checks.reduce((acc, check) => {
      if (check._hs_overall_score === 1) {
        acc = acc + 1;
      }
      return acc;
    }, 0);
    return {
      count,
      success,
      failed: count - success,
    };
  }

  changeSize(size: 'mini' | 'full'): void {
    this.size = size;
  }
}
