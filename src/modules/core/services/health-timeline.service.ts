import { Injectable } from '@angular/core';
import { ITimelineLog } from '@shared/models/timeline-log.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HealthTimelineService {
  currentData: BehaviorSubject<ITimelineLog> = new BehaviorSubject(null);

  getMinimumAndMaximumTimestamps(d: ITimelineLog): [number, number] {
    const logItems = Object.values(d).filter(arr => arr && arr.length > 0);
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

    return [minTimestamp, maxTimestamp];
  }
}
