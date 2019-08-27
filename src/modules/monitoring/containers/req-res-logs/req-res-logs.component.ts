import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModelVersion } from '@shared/_index';

@Component({
  selector: 'hs-req-res-logs',
  templateUrl: './req-res-logs.component.html',
  styleUrls: ['req-res-logs.component.scss'],
})
export class ReqResLogsComponent {
  log$: any;
  maxMessages: number = 20;
  maxMBytes: number = 5;
  reverse: boolean = true;
  loadFailed: boolean = true;
  loading: boolean = false;

  @Input() log: any;
  @Input() modelVersion: ModelVersion;
  @Output() clickedUpdateReqstore: EventEmitter<{
    maxMessages: number;
    maxMBytes: number;
    reverse: boolean;
    loadFailed: boolean;
  }> = new EventEmitter();

  updateReqstore() {
    const { maxMBytes, maxMessages, reverse, loadFailed } = this;

    this.clickedUpdateReqstore.emit({
      maxMessages,
      maxMBytes,
      reverse,
      loadFailed,
    });
  }
}
