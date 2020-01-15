import { Injectable } from '@angular/core';
import { ChecksAggregationResponse } from '@monitoring/interfaces';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AggregationPaginator {
  elementsPerColumn$: BehaviorSubject<number> = new BehaviorSubject(10);

  canLoadNewest(offset: number): boolean {
    return offset !== 0;
  }
  canLoadOlder(
    count: number,
    receivedCount: number,
    offset: number,
    groupedBy: number
  ): boolean {
    return receivedCount + offset * groupedBy < count;
  }
}
