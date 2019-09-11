import { Component, Input } from '@angular/core';
import { CustomCheck } from '@monitoring/interfaces';

@Component({
  selector: 'hs-custom-checks',
  templateUrl: './custom-checks.component.html',
})
export class CustomChecksComponent {
  @Input() customChecks: CustomCheck[];

  trackByFn(_, item: CustomCheck) {
    return item.name;
  }
}
