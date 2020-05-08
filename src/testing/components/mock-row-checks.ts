import { Component, Input } from '@angular/core';

@Component({
  selector: 'hs-raw-checks',
  template: '',
})
export class RawChecksComponent {
  @Input() check: any;
  @Input() modelVersion: any;
  @Input() inputKeys: string[] = [];
  @Input() outputKeys: string[] = [];
}
