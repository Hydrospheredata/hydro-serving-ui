import { Injectable, OnDestroy } from '@angular/core';
import { ModelsFacade } from '@models/store';
import {
  CheckCollection,
  AggregationsList,
  CheckId,
  Check,
} from '@monitoring/models';
import { Aggregation } from '@monitoring/models/Aggregation';
import { MetricsFacade } from '@monitoring/store/facades/metrics.facade';
import { MonitoringFacade } from '@monitoring/store/monitoring.facade';
import { ModelVersion } from '@shared/models';
import { neitherNullNorUndefined } from '@shared/utils';
import { Observable, Subject, combineLatest, timer } from 'rxjs';
import { tap, takeUntil, switchMap } from 'rxjs/operators';

@Injectable()
export class MonitoringPageService implements OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private monitoringStore: MonitoringFacade,
    private modelsFacade: ModelsFacade,
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
    return this.modelsFacade.selectedModelVersion$;
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

  showCheckDetails(checkId: CheckId): void {
    this.monitoringStore.showChecksDetails(checkId);
  }

  closeCheckDetails(): void {
    this.monitoringStore.closeChecksDetails();
  }

  ngOnDestroy() {
    this.monitoringStore.clearMonitoringPage();
    this.destroy$.next();
    this.destroy$.complete();
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
      this.modelsFacade.selectedModelVersion$.pipe(
        tap(() => this.monitoringStore.clearMonitoringPage())
      ),
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
