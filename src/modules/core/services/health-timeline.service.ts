import { Injectable } from '@angular/core';
import { HealthTimelineHistoryService } from '@core/services/health-timeline-history.service';
import { HttpService } from '@core/services/http';
import { IMonitoringAggregationItem } from '@core/services/metrics/monitoring.service';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import { BehaviorSubject, of, Observable } from 'rxjs';

@Injectable()
export class HealthTimelineService {
    currentData: BehaviorSubject<ITimelineLog> = new BehaviorSubject(null);
    private baseReqstoreUrl: string;

    constructor(
        private http: HttpService,
        private log: HealthTimelineHistoryService
    ) {

    }

    // getData(from: number, to: number, idx: number = 0): Observable<IMonitoringAggregationItem> {
    //     if (this.currentData.getValue()) { this.storePrevLog(); }
    //     return of();
    // }

    historyExist(): boolean {
        return this.log.existRecords();
    }

    getPrevLog() {
        const prevLog = this.log.pull();
        this.currentData.next(prevLog);
    }

    getMinimumAndMaximumTimestamps(d: ITimelineLog): [number, number] {
        const logItems = Object.values(d).filter(arr => arr.length > 0);
        let minTimestamp: number;
        let maxTimestamp: number;

        for (let i = 0, l = logItems.length; i < l; i++) {
            const firstElement = logItems[i][0];
            const lastElement = logItems[i][logItems[i].length - 1];

            if (minTimestamp === undefined || firstElement.from < minTimestamp) {
                minTimestamp = firstElement.from;
            }

            if (maxTimestamp === undefined || lastElement.till > maxTimestamp) {
                maxTimestamp = lastElement.till;
            }
        }

        return [
           minTimestamp * 1000,
           maxTimestamp * 1000,
        ];
    }

    private storePrevLog() {
        this.log.push(this.currentData.getValue());
    }
}
