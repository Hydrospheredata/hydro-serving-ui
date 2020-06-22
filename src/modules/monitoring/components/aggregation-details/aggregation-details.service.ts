import { Injectable } from '@angular/core';
import { ModelsFacade } from '@models/store';
import { Check, CheckCollection } from '@monitoring/models';
import { MonitoringFacade } from '@monitoring/store/monitoring.facade';
import { ModelVersion } from '@shared/models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export const enum ChecksHealthFilterOptions {
  all = 'ALL',
  byScore = 'SCORE',
  withError = 'ERROR',
}

export interface ChecksFilter {
  filterBy: ChecksHealthFilterOptions;
  scoreFilter?: {
    byMetric: boolean;
    metricScoreRange: [number, number];
    byRaw: boolean;
    rawScoreRange: [number, number];
  };
}

const initialFilter: ChecksFilter = {
  filterBy: ChecksHealthFilterOptions.all,
  scoreFilter: {
    byMetric: true,
    metricScoreRange: [0, 100],
    byRaw: true,
    rawScoreRange: [0, 100],
  },
};

@Injectable({
  providedIn: 'root',
})
export class AggregationDetailsService {
  private checks$: Observable<Check[]>;

  private filter: BehaviorSubject<ChecksFilter> = new BehaviorSubject<
    ChecksFilter
  >(initialFilter);
  private filter$: Observable<ChecksFilter>;

  constructor(
    private facade: MonitoringFacade,
    private modelsFacade: ModelsFacade
  ) {
    this.checks$ = this.facade
      .getChecks()
      .pipe(map(checksCollection => checksCollection.getChecks()));
    this.filter$ = this.filter.asObservable();
  }

  setFilter(filter: ChecksFilter): void {
    this.filter.next(filter);
  }

  getModelVersion(): Observable<ModelVersion> {
    return this.modelsFacade.selectedModelVersion$;
  }

  getCheckCollection(): Observable<CheckCollection> {
    return this.facade.getChecks();
  }

  getVisibleChecks(): Observable<Check[]> {
    return combineLatest([this.checks$, this.filter$]).pipe(
      map(([checks, filter]) => {
        console.log(filter);
        switch (filter.filterBy) {
          case ChecksHealthFilterOptions.all:
            return checks;
          case ChecksHealthFilterOptions.byScore:
            if (filter.scoreFilter === undefined) return checks;
            return checks.filter(check => {
              let m: boolean = true;
              let r: boolean = true;

              const metricScore = check.getMetricsScore() * 100;
              const rawScore = check.getRawScore() * 100;

              if (filter.scoreFilter.byMetric) {
                const [min, max] = filter.scoreFilter.metricScoreRange;
                m = metricScore >= min && metricScore <= max;
              }

              if (filter.scoreFilter.byRaw) {
                const [min, max] = filter.scoreFilter.rawScoreRange;
                r = rawScore >= min && rawScore <= max;
              }

              return r && m;
            });
          case ChecksHealthFilterOptions.withError:
            return checks.filter(check => check.error);
          default:
            return checks;
        }
      })
    );
  }
}
