import { Component, InjectionToken, Inject } from '@angular/core';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

export const REQUESTS_ERRORS = new InjectionToken<Array<null | string>>(
  'requests errors array'
);

@Component({
  templateUrl: './dialog-requests-errors.component.html',
  styleUrls: ['./dialog-requests-errors.component.scss'],
})
export class DialogRequestsErrorsComponent {
  constructor(
    private dialog: DialogsService,
    @Inject(REQUESTS_ERRORS) public errors: Array<string | null>
  ) {}

  close() {
    this.dialog.closeDialog();
  }
}
