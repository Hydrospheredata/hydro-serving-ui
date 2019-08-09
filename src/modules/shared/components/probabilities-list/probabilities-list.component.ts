import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import * as colorScale from 'd3-scale-chromatic';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
@Component({
  selector: 'hs-probabilities-list',
  templateUrl: 'probabilities-list.component.html',
  styleUrls: ['probabilities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProbabilitiesListComponent {
  probs: Array<{ class: number; value: number, color: string }>;

  showMore$: BehaviorSubject<any> = new BehaviorSubject('');
  showedProbabilities$: Observable<number[]> = this.showMore$.pipe(
    scan(acc => {
      const STEP = 5;
      const accLength = acc.length;
      const res = [
        ...acc,
        ...this.probs.slice(accLength, accLength + STEP),
      ];
      return res;
    }, [])
  );

  @Input()
  set probabilities(list: number[]) {
    this.probs = list
      .map((value, idx) => ({
        class: idx,
        value,
        color: colorScale.interpolateBlues(value < .15 ? .15 : value),
      }))
      .sort((a, b) => b.value - a.value);
  }

  showMore() {
    this.showMore$.next('');
  }
}
