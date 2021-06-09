import { Component, OnInit } from '@angular/core';
import { BuildInformationService } from '@app/core/build-information.service';
import { UiBuildInfo, UiBuildInfoService } from '@app/core/ui-build-info.service';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './build-information-dialog.component.html',
  styleUrls: ['./build-information-dialog.component.scss'],
})
export class BuildInformationDialogComponent implements OnInit {
  buildInfo$: Observable<any>;
  uiBI: UiBuildInfo;

  constructor(
    private uiBuildInfo: UiBuildInfoService,
    private buildInfo: BuildInformationService,
    private dialog: DialogsService
  ) {
    this.uiBI = uiBuildInfo.config;
  }

  ngOnInit() {
    this.buildInfo$ = this.buildInfo.getBuildInfo();
  }

  onClose(): void {
    this.dialog.closeDialog();
  }
}
