import { Component, InjectionToken, Inject } from '@angular/core';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { Application } from '@app/core/data/types';

export let SELECTED_UPD_APPLICATION = new InjectionToken<Application>(
  'selectedApplication'
);

@Component({
  templateUrl: './dialog-update-application.component.html',
})
export class DialogUpdateApplicationComponent {
  constructor(
    @Inject(SELECTED_UPD_APPLICATION)
    public application: Application,
    public facade: ApplicationsFacade,
    public dialog: DialogsService
  ) {}

  public onClose(): void {
    this.dialog.closeDialog();
  }

  public onSubmit(formData) {
    formData.id = this.application.id;
    this.facade.editApplication(new Application(formData));
    this.onClose();
  }
}
