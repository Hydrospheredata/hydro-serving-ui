import { KeyValue } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { IMetricData } from '@core/services/metrics/monitoring.service';
import { ModelVersion } from '@shared/models/_index';
import { isEmptyObj } from '@shared/utils/is-empty-object';
import * as _ from 'lodash';
import { ExplanationRequestBody } from '@rootcause/interfaces';

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
  clickedGetExplanation: EventEmitter<ExplanationRequestBody> = new EventEmitter();

  uid: string;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.logData && changes.logData.currentValue) {
      const sameData = _.isEqual(
        changes.logData.previousValue,
        changes.logData.currentValue
      );
      const values = Object.keys(changes.logData.currentValue);
      if (values.length > 0) {
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
    return !isEmptyObj(this.logData);
  }

  getExplanation(): void {
    const explained_instance = this.selectedLogItem;
    debugger;
    this.clickedGetExplanation.next({
      model: {
        name: this.modelVersion.model.name,
        version: `${this.modelVersion.modelVersion}`
      },
      explained_instance,
    });
  }
}
