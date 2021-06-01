import { Observable, Subject, combineLatest, timer, Subscription } from 'rxjs';
import { tap, takeUntil, switchMap, take } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';

import {
  CheckCollection,
  AggregationsList,
  CheckId,
  Check,
  Aggregation,
} from '../../models';

import { MetricsFacade } from '../../store/facades/metrics.facade';
import { MonitoringFacade } from '../../store/monitoring.facade';

import { ModelVersion } from '@app/core/data/types';
import { neitherNullNorUndefined } from '@app/utils';

@Injectable()
export class MonitoringPageService implements OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();
  private checksSubscription: Subscription;

  constructor(
    private monitoringStore: MonitoringFacade,
    private modelVersionsFacade: ModelVersionsFacade,
    private metricsFacade: MetricsFacade
  ) {}

  getSelectedAggregation(): Observable<Aggregation | undefined> {
    return this.monitoringStore.getSelectedAggregation();
  }

  getChecks(): Observable<CheckCollection> {
    return this.monitoringStore.getChecks();
  }

  isChecksLoading(): Observable<boolean> {
    return this.monitoringStore.isChecksLoading();
  }

  getModelVersion(): Observable<ModelVersion> {
    return this.modelVersionsFacade.selectedModelVersion();
  }

  deleteMetric(id: string): void {
    this.metricsFacade.deleteMetric(id);
  }

  addMetric(metric: any): void {
    this.metricsFacade.addMetric(metric);
  }

  getAggregationList(): Observable<AggregationsList> {
    return this.monitoringStore.getAggregationList();
  }

  getCheckToShowInDetails(): Observable<Check> {
    return this.monitoringStore.getCheckToShowInDetails();
  }

  showCheckDetails(checkId?: CheckId, checkIdx?: number): void {
    if (checkIdx && !checkId) {
      this.checksSubscription = this.monitoringStore
        .getChecks()
        .pipe(take(1))
        .subscribe(checks => {
          checkId = checks.getChecks()[checkIdx - 1].id;
          this.monitoringStore.showChecksDetails(checkId);
        });
    } else this.monitoringStore.showChecksDetails(checkId);
  }

  closeCheckDetails(): void {
    this.monitoringStore.closeChecksDetails();
  }

  ngOnDestroy() {
    this.monitoringStore.clearMonitoringPage();
    this.destroy$.next();
    this.destroy$.complete();
    if (this.checksSubscription) this.checksSubscription.unsubscribe();
  }

  loadChecks(): void {
    this.monitoringStore
      .getSelectedAggregation()
      .pipe(
        neitherNullNorUndefined,
        tap(aggregation => {
          const { modelVersionId, from, to } = aggregation;
          this.monitoringStore.loadChecks({ modelVersionId, from, to });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  loadMetrics(): void {
    this.metricsFacade.loadMetrics();
  }

  loadAggregations(): void {
    combineLatest([
      this.modelVersionsFacade
        .selectedModelVersion()
        .pipe(tap(() => this.monitoringStore.clearMonitoringPage())),
      this.monitoringStore.getOffset(),
      this.monitoringStore.getFilterDateRange(),
    ])
      .pipe(
        switchMap(([modelVersion, offset, filterDateRange]) => {
          return timer(0, 10000).pipe(
            tap(() => {
              this.monitoringStore.loadAggregation({
                modelVersion,
                limit: 80,
                offset,
                from:
                  filterDateRange &&
                  Math.round(filterDateRange.from / 1000).toString(),
                to:
                  filterDateRange &&
                  Math.round(filterDateRange.to / 1000).toString(),
              });
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
