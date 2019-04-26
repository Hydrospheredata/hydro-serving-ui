import { Injectable } from '@angular/core';
import { ITimelineLog } from '@shared/models/timeline-log.model';

@Injectable()
export class HealthTimelineHistoryService {
    private log: ITimelineLog[] = [];

    push(timelineLog: ITimelineLog): void {
        this.log = [...this.log, timelineLog];
    }

    pull(): ITimelineLog {
        const length = this.log.length;
        if (length === 0) { return; }

        const lastElement = this.log.slice(length - 1, 1)[0];
        this.log = this.log.slice(0, length - 2);

        return lastElement;
    }

    clear(): void {
        this.log = [];
    }

    existRecords(): boolean {
        return this.log.length > 0;
    }
}
