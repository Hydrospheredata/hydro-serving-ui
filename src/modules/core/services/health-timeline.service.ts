import { Injectable } from '@angular/core';
import { HealthTimelineHistoryService } from '@core/services/health-timeline-history.service';
import { HttpService } from '@core/services/http';
import { ITimelineLog, ITimelineLogItemStatus } from '@shared/models/timeline-log.model';
import { Observable, of, BehaviorSubject } from 'rxjs';

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

const data_2 = {
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

@Injectable()
export class HealthTimelineService {
    currentData: BehaviorSubject<ITimelineLog> = new BehaviorSubject(null);
    private baseReqstoreUrl: string;

    constructor(
        private http: HttpService,
        private log: HealthTimelineHistoryService
    ) {
    }

    getData(from: number, to: number, derived?: boolean): void {
        if (this.currentData.getValue()) { this.storePrevLog(); }
        if (derived) {
            this.currentData.next(data_2);
        } else {
            this.currentData.next(data);
        }
    }

    historyExist(): boolean {
        return this.log.existRecords();
    }

    getPrevLog() {
        const prevLog = this.log.pull();
        this.currentData.next(prevLog);
    }

    private storePrevLog() {
        this.log.push(this.currentData.getValue());
    }
}
