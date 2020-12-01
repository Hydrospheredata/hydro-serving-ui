import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { neitherNullNorUndefined } from '@app/utils';
import { Check, CheckCollection } from '../../models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ModelVersion } from '@app/core/data/types';
import { MonitoringFacade } from '../../store/monitoring.facade';

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
export class BatchDetailsService {
  private checks$: Observable<Check[]>;
  private filter: BehaviorSubject<ChecksFilter> = new BehaviorSubject<
    ChecksFilter
  >(initialFilter);
  private filter$: Observable<ChecksFilter>;

  constructor(
    private facade: MonitoringFacade,
    private modelVersionsFacade: ModelVersionsFacade
  ) {
    this.checks$ = this.facade.getChecks().pipe(
      neitherNullNorUndefined,
      map(checksCollection => checksCollection.getChecks())
    );
    this.filter$ = this.filter.asObservable();
  }

  setFilter(filter: ChecksFilter): void {
    this.filter.next(filter);
  }

  getModelVersion(): Observable<ModelVersion> {
    return this.modelVersionsFacade.selectedModelVersion();
  }

  getCheckCollection(): Observable<CheckCollection> {
    return this.facade.getChecks();
  }

  getVisibleChecks(): Observable<Check[]> {
    return combineLatest([this.checks$, this.filter$]).pipe(
      map(([checks, filter]) => {
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
