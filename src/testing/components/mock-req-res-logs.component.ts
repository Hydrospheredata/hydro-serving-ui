import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'hs-req-res-logs',
  template: '',
})
export class ReqResLogsComponent {
  @Input() log: any;
  @Input() modelVersion: any;
  @Output() clickedUpdateReqstore: EventEmitter<any> = new EventEmitter();
}
