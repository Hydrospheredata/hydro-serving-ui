import { Component, ViewChild } from '@angular/core';
import { ApplicationFormComponent } from '@applications/components/forms/application-form/application-form.component';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';

@Component({
  templateUrl: './dialog-add-application.component.html',
})
export class DialogAddApplicationComponent {
  @ViewChild('applicationForm')
  ApplicationFormComponent: ApplicationFormComponent;

  constructor(
    public dialog: DialogService,
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
