import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModelVersion } from '@shared/models/_index';
import { isEqual, isEmpty } from 'lodash';

@Component({
  selector: 'hs-reqstore-table-log',
  templateUrl: './reqstore-table-log.component.html',
  styleUrls: ['./reqstore-table-log.component.scss'],
})
export class ReqstoreTableLogComponent implements OnInit, OnChanges {
  @Input()
  modelVersion: ModelVersion;

  @Input()
  logData: any;

  @Input()
  loading: any = false;

  @Output()
  queuedExplanation: EventEmitter<any> = new EventEmitter();

  uid: string;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.logData && changes.logData.currentValue) {
      const sameData = isEqual(
        changes.logData.previousValue,
        changes.logData.currentValue
      );
      const values = Object.keys(changes.logData.currentValue);
      if (!isEmpty(values)) {
        if (!sameData) {
          this.uid = values[0];
        }
      } else {
        this.uid = undefined;
      }
    }
  }

  ngOnInit(): void {}

  get selectedLogItem() {
    return this.logData[this.uid];
  }

  selectLogItem(uid: string) {
    this.uid = uid;
  }

  logNotEmpty(): boolean {
    return !isEmpty(this.logData);
  }

  onQueuedExplanation() {
    this.queuedExplanation.emit();
  }
}
