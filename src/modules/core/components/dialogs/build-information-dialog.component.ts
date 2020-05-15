import { Component, OnInit } from '@angular/core';
import { BuildInformationService } from '@core/services/build-information.service';
import { DialogService } from '@dialog/dialog.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './build-information-dialog.component.html',
  styleUrls: ['./build-information-dialog.component.scss'],
})
export class BuildInformationDialogComponent implements OnInit {
  buildInfo$: Observable<any>;
  constructor(
    private buildInfo: BuildInformationService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.buildInfo$ = this.buildInfo.getBuildInfo();
  }

  onClose(): void {
    this.dialog.closeDialog();
  }
}
