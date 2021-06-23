import { Directive, HostListener } from '@angular/core';
import { BuildInformationDialogComponent } from '@app/modules/dialogs/components';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';

@Directive({
  selector: '[hsBuildInformation]',
})
export class BuildInformationDirective {
  constructor(private dialog: DialogsService) {}

  @HostListener('click')
  onclick() {
    this.dialog.createDialog({
      component: BuildInformationDialogComponent,
      styles: {
        width: '1000px',
      },
    });
  }
}
