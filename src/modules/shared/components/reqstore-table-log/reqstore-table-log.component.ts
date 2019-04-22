import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ReqstoreService } from '@core/services/reqstore.service';
import { IModelVersion } from '@shared/models/_index';

interface LogItem {
    count: number;
    failed: number;
    entities: any[];
}
interface Log {
    [timestamp: string]: LogItem;
}

@Component({
    selector: 'hs-reqstore-table-log',
    templateUrl: './reqstore-table-log.component.html',
    styleUrls: ['./reqstore-table-log.component.scss'],
})
export class ReqstoreTableLogComponent implements OnInit, OnChanges {
    maxBytes: string = '10240';
    maxMessages: string = '10';
    reverse: string = 'false';

    @Input()
    modelVersion: IModelVersion;

    @Input()
    logData: any;

    selectedLogItem: LogItem;
    imageData;

    constructor(
        private reqstore: ReqstoreService
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if(changes.logData){
        // }
    }

    ngOnInit(): void {}

    selectLogItem(item) {
        this.selectedLogItem = item;
    }
}
