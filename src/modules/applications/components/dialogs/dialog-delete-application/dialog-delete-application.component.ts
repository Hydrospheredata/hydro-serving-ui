import { Component, InjectionToken, Inject } from '@angular/core';
import { ApplicationsFacade } from '@applications/store';
import { DialogService } from '@dialog/dialog.service';
import { Application } from '@shared/_index';

export const SELECTED_DEL_APPLICATION = new InjectionToken<Application>(
  'selectedApplication'
);

@Component({
  templateUrl: './dialog-delete-application.component.html',
})
export class DialogDeleteApplicationComponent {
  get name(): string {
    return this.application.name;
  }

  constructor(
    private facade: ApplicationsFacade,
    public dialog: DialogService,
    @Inject(SELECTED_DEL_APPLICATION)
    private application: Application
  ) {}

  public onDelete() {
    this.facade.deleteApplication(this.application);
    this.dialog.closeDialog();
  }
}
