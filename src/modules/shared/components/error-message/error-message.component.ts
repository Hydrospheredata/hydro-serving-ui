import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

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
export class ErrorMessageComponent implements OnInit {
  ngOnInit() {
  }
}
