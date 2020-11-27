import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hs-error-message',
  template: `
    <div class='error'>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
}
