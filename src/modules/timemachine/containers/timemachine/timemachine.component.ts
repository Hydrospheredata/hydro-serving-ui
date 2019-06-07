import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@dialog/dialog.service';
import { DialogAddReplyComponent } from '@timemachine/components';

@Component({
  selector: 'hs-timemachine',
  templateUrl: './timemachine.component.html',
  styleUrls: ['./timemachine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimemachineComponent implements OnInit {
  constructor(private dialogService: DialogService) {}
  ngOnInit() {}

  openDialog(): void {
    this.dialogService.createDialog({
      component: DialogAddReplyComponent,
    });
  }
}
