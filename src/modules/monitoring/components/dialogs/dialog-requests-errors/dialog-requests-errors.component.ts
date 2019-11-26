import { Component, InjectionToken, Inject } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';

export const REQUESTS_ERRORS = new InjectionToken<Array<null | string>>(
  'requests errors array'
);

@Component({
  templateUrl: './dialog-requests-errors.component.html',
  styleUrls: ['./dialog-requests-errors.component.scss'],
})
export class DialogRequestsErrorsComponent {
  constructor(
    private dialog: DialogService,
    @Inject(REQUESTS_ERRORS) public errors: Array<string | null>
  ) {}

  close() {
    this.dialog.closeDialog();
  }
}
