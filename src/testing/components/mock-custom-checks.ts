import { Input, Component } from '@angular/core';

@Component({
  selector: 'hs-custom-checks',
  template: '',
})
export class CustomChecksComponent {
  @Input() customMetrics: any[];
  @Input() customChecks: any[];
  @Input() loading: boolean = false;
}
