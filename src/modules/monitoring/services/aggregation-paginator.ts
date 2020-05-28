import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AggregationPaginator {
  elementsPerColumn$: BehaviorSubject<number> = new BehaviorSubject(10);

  canLoadNewer(offset: number): boolean {
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
