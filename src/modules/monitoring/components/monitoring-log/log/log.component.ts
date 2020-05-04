import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Check, CheckCollection } from '@monitoring/interfaces';
import { ModelVersion } from '@shared/models';

@Component({
  selector: 'hs-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent implements OnChanges {
  selectedCheck: Check;
  size: 'mini' | 'full' = 'full';

  @Input() modelVersion: ModelVersion;
  @Input() checks: CheckCollection;
  @Input() loading: boolean;

  selectItem(check: Check) {
    this.selectedCheck = check;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checks && changes.checks.currentValue) {
      const checks = changes.checks.currentValue as CheckCollection;
      this.selectItem(checks.getFirstElement());
    }
  }

  get requestsSummaryInfo(): {
    count: number;
    failed: number;
    success: number;
  } {
    return this.checks.getSummaryInformation();
  }

  changeSize(size: 'mini' | 'full'): void {
    this.size = size;
  }
}
