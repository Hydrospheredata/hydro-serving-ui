import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AggregationPaginator {
  elementsPerColumn$: BehaviorSubject<number> = new BehaviorSubject(10);

  canLoadNewer(offset: number): boolean {
    return offset !== 0;
  }

  canLoadOlder(
    totalBatchesCount: number,
    showedBatchesCount: number,
    offset: number
  ): boolean {
    return showedBatchesCount + offset < totalBatchesCount;
  }
}
