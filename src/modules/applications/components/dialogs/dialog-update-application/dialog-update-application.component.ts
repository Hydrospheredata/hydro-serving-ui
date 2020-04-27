import { Component, InjectionToken, Inject } from '@angular/core';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { Application } from '@shared/models';

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
    public dialog: DialogService
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
