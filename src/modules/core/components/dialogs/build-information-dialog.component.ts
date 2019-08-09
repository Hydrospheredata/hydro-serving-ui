import { Component } from '@angular/core';
import { BuildInformationService } from '@core/services/build-information.service';
import { DialogService } from '@dialog/dialog.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './build-information-dialog.component.html',
  styleUrls: ['./build-information-dialog.component.scss'],
})
export class BuildInformationDialogComponent {
  buildInfo$: Observable<any>;
  constructor(
    private buildInfo: BuildInformationService,
    private dialog: DialogService
  ) {
    this.buildInfo$ = buildInfo.getBuildInformation();
  }

  onClose(): void {
    this.dialog.closeDialog();
  }
}
