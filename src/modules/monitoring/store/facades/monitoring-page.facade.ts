import { Injectable } from '@angular/core';
import { getSelectedModelVersion, getSiblingVersions } from '@models/reducers';
import {
  LoadMetrics,
  LoadFullAggregation,
  SetTimeInterval,
  LoadReqstoreData,
  LoadSonarData,
  LoadDetailedAggreagation,
  StopAutoUpdate,
  StartAutoUpdate,
  SetDetailedTimeInterval,
  addComparedModelVersionId,
  LoadComparedSonarData,
  ClearPage,
  SetTimeBound,
} from '@monitoring/store/actions';
import { State } from '@monitoring/store/reducers';
import {
  getMetrics,
  selectFullAggregation,
  selectTimeInterval,
  selectSonarData,
  selectDetailedChartsWithData,
  selectRequestResponseLog,
  selectDetailedAggregation,
  selectIsLive,
  selectDetailedTimeInterval,
  selectComparedMetricSpecifications,
  selectTimeBound,
} from '@monitoring/store/selectors';
import { Store, select } from '@ngrx/store';
import { TimeInterval, ModelVersion, ModelVersionStatus } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { TimelineLog } from '@shared/models/timeline-log.model';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MonitoringPageFacade {
  selectedModelVersion$ = this.store.pipe(
    select(getSelectedModelVersion),
    filter(val => !!val)
  );
  metrics$: Observable<MetricSpecification[]> = this.store.pipe(
    select(getMetrics)
  );
  fullAggregation$: Observable<any> = this.store.pipe(
    select(selectFullAggregation)
  );
  detailedAggregation$: Observable<any> = this.store.pipe(
    select(selectDetailedAggregation)
  );
  timeInterval$: Observable<any> = this.store.pipe(
    select(selectTimeInterval),
    filter(val => val !== undefined)
  );
  detailedTimeInterval$: Observable<TimeInterval> = this.store.pipe(
    select(selectDetailedTimeInterval)
  );
  sonarData$: Observable<any> = this.store.pipe(select(selectSonarData));
  detailedCharts$: Observable<any> = this.store.pipe(
    select(selectDetailedChartsWithData)
  );
  reqResLog$: Observable<any> = this.store.pipe(
    select(selectRequestResponseLog)
  );
  isLive$: Observable<boolean> = this.store.pipe(select(selectIsLive));
  siblingModelVersions$: Observable<ModelVersion[]> = this.store.pipe(
    select(getSiblingVersions),
    map(modelVersions => {
      return modelVersions.filter(
        mv => mv.status === ModelVersionStatus.Released
      );
    })
  );
  comparedMetrocSpecifications$ = this.store.pipe(
    select(selectComparedMetricSpecifications)
  );
  timeBound$ = this.store.pipe(
    select(selectTimeBound)
  );
  constructor(private store: Store<State>) {}

  clear(): void {
    this.store.dispatch(ClearPage());
  }
  loadFullAggregation({ timeBoundary }): void {
    this.store.dispatch(LoadFullAggregation({ timeBoundary }));
  }

  loadDetailedAggregation({
    timeInterval,
  }: {
    timeInterval: TimeInterval;
  }): void {
    this.store.dispatch(LoadDetailedAggreagation({ timeInterval }));
  }

  loadMetrics(modelVersionId: number): void {
    this.store.dispatch(LoadMetrics({ modelVersionId }));
  }

  loadReqstoreData(params: {
    maxMBytes: number;
    maxMessages: number;
    reverse: boolean;
  }): void {
    this.store.dispatch(LoadReqstoreData(params));
  }

  loadSonarData() {
    this.store.dispatch(LoadSonarData());
  }

  loadComparedSonarData() {
    this.store.dispatch(LoadComparedSonarData());
  }

  setTimeInterval(timeInterval: TimeInterval): void {
    this.store.dispatch(SetTimeInterval({ timeInterval }));
  }
  setDetailedTimeInterval(timeInterval: TimeInterval): void {
    this.store.dispatch(SetDetailedTimeInterval({ timeInterval }));
  }

  getMinimumAndMaximumTimestamps(log: TimelineLog): [number, number] {
    const logItems = Object.values(log).filter(arr => arr && arr.length > 0);
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

  addModelVersionIdToCompare({
    modelVersionId,
    metricSpecId,
    metricSpecKind,
  }: {
    modelVersionId: number;
    metricSpecId: string;
    metricSpecKind: string;
  }) {
    this.store.dispatch(
      addComparedModelVersionId({
        modelVersionId,
        metricSpecId,
        metricSpecKind,
      })
    );
  }

  setTimeBound({ timeBound }: { timeBound: number }) {
    this.store.dispatch(SetTimeBound({ timeBound }));
  }

  stopAutoUpdate(): void {
    this.store.dispatch(StopAutoUpdate());
  }

  startAutoUpdate(): void {
    this.store.dispatch(StartAutoUpdate());
  }
}
