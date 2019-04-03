import { Directive, HostListener } from '@angular/core';
import { BuildInformationDialogComponent } from '@core/_index';
import { DialogService } from '@dialog/dialog.service';

@Directive({
    selector: '[hsBuildInformation]',
})
export class BuildInformationDirective {
    constructor(
        private dialog: DialogService
    ) {
    }

     @HostListener('click')
     onclick() {
         this.dialog.createDialog({
             component: BuildInformationDialogComponent,
             styles: {
                 width: '600px',
             },
         });
     }
}
