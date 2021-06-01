import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'hs-alert-message',
  template: `<div class="alert">
    <ng-content></ng-content>
  </div> `,
  styleUrls: ['./alert-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AlertMessageComponent {}
