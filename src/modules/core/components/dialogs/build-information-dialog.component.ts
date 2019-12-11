import { Component } from '@angular/core';
import { BuildInformationService } from '@core/services/build-information.service';
import { DialogService } from '@dialog/dialog.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './build-information-dialog.component.html',
  styleUrls: ['./build-information-dialog.component.scss'],
})
export class BuildInformationDialogComponent {
  buildInfo$: Observable<any> = this.buildInfo.getBuildInformation();
  constructor(
    private buildInfo: BuildInformationService,
    private dialog: DialogService
  ) {}

  onClose(): void {
    this.dialog.closeDialog();
  }
}
