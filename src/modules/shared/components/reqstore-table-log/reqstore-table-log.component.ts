import { Component, Input, OnInit } from '@angular/core';
import { ReqstoreService } from '@core/services/reqstore.service';
import { ITimeInterval, IModelVersion } from '@shared/models/_index';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
const MOCK_DATA: any = {
    "1555336446105": {
        entities: [{
            metricData: {name: 1, value: 2},
            request: {
                inputs: {
                    'pew': []
                }
            },
            response: {},
        }],
    },
};


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
export class ReqstoreTableLogComponent implements OnInit {

    @Input()
    modelVersion: IModelVersion;

    @Input()
    set timeInterval(ti: ITimeInterval) {
        debugger;
        this.ti = ti;
        this.ti$.next(ti);
    }

    ti$: BehaviorSubject<ITimeInterval> = new BehaviorSubject(null);
    ti: ITimeInterval;
    log$: Observable<Log>;
    selectedLogItem: any;
    imageData;

    constructor(
        private reqstore: ReqstoreService,
        public http: HttpClient
    ) {
    }

    // public loadJSONimg() {
    //     if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
    //         return true;
    //     }
    //     const fileUrl = 'assets/reqstore/image.json';
    //     const { protocol, port, hostname } = window.location;
  
    //     this.http.get(`${protocol}//${hostname}:${port}/${fileUrl}`, { observe: 'body', responseType: 'text'})
    //       .pipe(
    //       ).subscribe(res => {
    //           this.imageData = res;
    //         }
    //       );
    //   }

    ngOnInit(): void {
        // this.loadJSONimg();
        this.log$ = this.ti$.pipe(
            switchMap(({from, to}) => {
               return this.reqstore.getData(1, from, to);
            })
        );
    }

    selectLogItem(item) {
        this.selectedLogItem = item;
    }
}
