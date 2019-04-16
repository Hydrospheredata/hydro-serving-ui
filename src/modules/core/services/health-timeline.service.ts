import { Injectable } from '@angular/core';
import { HealthTimelineHistoryService } from '@core/services/health-timeline-history.service';
import { HttpService } from '@core/services/http';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import { BehaviorSubject, of, Observable } from 'rxjs';

const data = {
    KS: [
        {
            from: new Date(2019, 0, 1).getTime(),
            to: new Date(2019, 1, 1).getTime(),
            status: 'success',
        },
        {
            from: new Date(2019, 1, 1).getTime(),
            to: new Date(2019, 2, 1).getTime(),
            status: 'failed',
        },
        {
            from: new Date(2019, 2, 1).getTime(),
            to: new Date(2019, 3, 1).getTime(),
            status: 'success',
        },
    ],
    Latency: [
        {
            from: new Date(2019, 0, 1).getTime(),
            to: new Date(2019, 1, 1).getTime(),
            status: 'success',
        },
        {
            from: new Date(2019, 1, 1).getTime(),
            to: new Date(2019, 2, 1).getTime(),
            status: 'failed',
        },
        {
            from: new Date(2019, 3, 1).getTime(),
            to: new Date(2019, 4, 1).getTime(),
            status: 'success',
        },
        {
            from: new Date(2019, 4, 1).getTime(),
            to: new Date(2019, 5, 1).getTime(),
            status: 'success',
        },
    ],
};

const data2 = {
    KS: [
        {
            from: new Date(2019, 1, 1).getTime(),
            to: new Date(2019, 1, 2).getTime(),
            status: 'success',
        },
        {
            from: new Date(2019, 1, 2).getTime(),
            to: new Date(2019, 1, 3).getTime(),
            status: 'failed',
        },
        {
            from: new Date(2019, 1, 3).getTime(),
            to: new Date(2019, 1, 4).getTime(),
            status: 'success',
        },
    ],
};

const da = [
    data, data2,
];

@Injectable()
export class HealthTimelineService {
    currentData: BehaviorSubject<ITimelineLog> = new BehaviorSubject(null);
    private baseReqstoreUrl: string;

    constructor(
        private http: HttpService,
        private log: HealthTimelineHistoryService
    ) {
    }

    getData(from: number, to: number, idx: number = 0): Observable<ITimelineLog> {
        if (this.currentData.getValue()) { this.storePrevLog(); }
        return of(da[idx]);
    }

    historyExist(): boolean {
        return this.log.existRecords();
    }

    getPrevLog() {
        const prevLog = this.log.pull();
        this.currentData.next(prevLog);
    }

    getMinimumAndMaximumTimestamps(d: ITimelineLog): [number, number] {
        const logItems = Object.values(d);
        let minTimestamp: number;
        let maxTimestamp: number;

        for (let i = 0, l = logItems.length; i < l; i++) {
            const firstElement = logItems[i][0];
            const lastElement = logItems[i][logItems[i].length - 1];

            if (minTimestamp === undefined || firstElement.from < minTimestamp) {
                minTimestamp = firstElement.from;
            }

            if (maxTimestamp === undefined || lastElement.to > maxTimestamp) {
                maxTimestamp = lastElement.to;
            }
        }

        return [
           minTimestamp,
           maxTimestamp,
        ];
    }

    private storePrevLog() {
        this.log.push(this.currentData.getValue());
    }
}
