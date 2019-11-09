import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CustomCheck } from '@monitoring/interfaces';
import { MetricSpecification } from '@shared/models/metric-specification.model';

@Component({
  selector: 'hs-custom-checks',
  templateUrl: './custom-checks.component.html',
  styleUrls: ['custom-checks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomChecksComponent {
  @Input() customMetrics: MetricSpecification[] = [];
  @Input() customChecks: CustomCheck[] = [];
  @Output() openSettings = new EventEmitter();

  trackByFn(_, item: CustomCheck) {
    return item.name;
  }

  onOpenSetting() {
    this.openSettings.emit();
  }

  get emptyMetrics(): boolean {
    return this.customMetrics.length === 0;
  }

  get noData(): boolean {
    return !this.customChecks || this.customChecks.length === 0;
  }
}
