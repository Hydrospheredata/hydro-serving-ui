import { Component, OnInit } from '@angular/core';
import { BuildInformationService } from '@app/core/build-information.service';
import { DialogsService } from '@app/modules/dialogs/dialogs.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './build-information-dialog.component.html',
  styleUrls: ['./build-information-dialog.component.scss'],
})
export class BuildInformationDialogComponent implements OnInit {
  buildInfo$: Observable<any>;
  constructor(
    private buildInfo: BuildInformationService,
    private dialog: DialogsService
  ) {}

  ngOnInit() {
    this.buildInfo$ = this.buildInfo.getBuildInfo();
  }

  onClose(): void {
    this.dialog.closeDialog();
  }
}
