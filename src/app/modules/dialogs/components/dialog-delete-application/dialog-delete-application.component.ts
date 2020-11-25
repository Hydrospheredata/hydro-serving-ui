import { Component, InjectionToken, Inject } from '@angular/core';

import { ApplicationsFacade } from '@app/core/facades/applications.facade';
import { Application } from '@app/core/data/types';

import { DialogsService } from '../../dialogs.service';

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
    public dialog: DialogsService,
    @Inject(SELECTED_DEL_APPLICATION)
    private application: Application
  ) {}

  public onDelete() {
    this.facade.deleteApplication(this.application);
    this.dialog.closeDialog();
  }
}
