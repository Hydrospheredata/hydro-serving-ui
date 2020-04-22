import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-log-detail',
  template: '',
})
export class LogDetailComponent {
  @Input() check: any;
  @Input() modelVersion: any;
}
