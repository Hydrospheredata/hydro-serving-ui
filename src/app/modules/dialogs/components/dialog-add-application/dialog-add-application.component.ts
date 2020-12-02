import { Component, ViewChild } from '@angular/core';
import { ApplicationsFacade } from '@app/core/facades/applications.facade';

import { DialogsService } from '../../dialogs.service';
import { ApplicationFormComponent } from '@app/modules/applications/components/forms';

@Component({
  templateUrl: './dialog-add-application.component.html',
})
export class DialogAddApplicationComponent {
  @ViewChild('applicationForm', { static: true })
  ApplicationFormComponent: ApplicationFormComponent;

  constructor(
    private dialog: DialogsService,
    private facade: ApplicationsFacade
  ) {}

  public onClose(): void {
    this.dialog.closeDialog();
  }

  public onSubmit(data): void {
    this.facade.addApplication(data);
    this.onClose();
  }
}
