import { Injectable } from '@angular/core';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { ChartServiceData } from '@monitoring/components/chart/chart.interfaces';
import { TimeInterval, SonarMetricData } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import * as _ from 'lodash';
import {
  Observable,
  Subject,
  combineLatest,
  BehaviorSubject,
  of,
  forkJoin,
} from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ChartService {
  get featureList(): string[] {
    const features: string[] = [];
    for (let i = 0; i < 112; i++) {
      features.push(`${i}`);
    }
    return features;
  }
  timeInterval: Subject<TimeInterval> = new Subject();
  metricSpecification: BehaviorSubject<
    MetricSpecification
  > = new BehaviorSubject(null);
  comparedModelVersionId: BehaviorSubject<number> = new BehaviorSubject(null);
  feature: BehaviorSubject<number> = new BehaviorSubject(null);

  private timeIntervalChanged$: Observable<
    TimeInterval
  > = this.timeInterval.asObservable();

  private metricSpecificationChanged$: Observable<
    MetricSpecification
  > = this.metricSpecification.asObservable();
  private comparedModelVersionIdChanged$: Observable<
    number
  > = this.comparedModelVersionId.asObservable();
  private featureChanged$: Observable<number> = this.feature.asObservable();

  constructor(
    private monitoringService: MonitoringService,
    private metricSettingsService: MetricSettingsService
  ) {}

  isKolmogorovSmirnov(metricSpecification: MetricSpecification): boolean {
    return metricSpecification.kind === 'KSMetricSpec';
  }

  getData(): Observable<ChartServiceData> {
    return combineLatest(
      this.timeIntervalChanged$,
      this.metricSpecificationChanged$,
      this.comparedModelVersionIdChanged$,
      this.featureChanged$
    ).pipe(
      exhaustMap(
        ([
          timeInterval,
          mainMetricSpecification,
          comparedModelVersionId,
          feature,
        ]) => {
          if (comparedModelVersionId) {
            return this.makeComparedRequest(
              timeInterval,
              mainMetricSpecification,
              comparedModelVersionId,
              feature
            );
          } else {
            return this.makeSimpleRequest(
              timeInterval,
              mainMetricSpecification,
              feature
            );
          }
        }
      )
    );
  }

  onTimeIntervalChange(ti: TimeInterval) {
    this.timeInterval.next(ti);
  }

  onMetricSpecificationChange(metricSpec: MetricSpecification) {
    this.metricSpecification.next(metricSpec);
  }

  onComparedModelVersionIdChange(modelVersionId: number) {
    this.comparedModelVersionId.next(modelVersionId);
  }

  onFeatureChange(feature: number) {
    this.feature.next(feature);
  }

  getMetricsBySpecKind(metricSpec: MetricSpecification) {
    return this.monitoringService.getMetricsBySpecKind(metricSpec.kind)[0];
  }

  private groupedDataByMetric(
    data: SonarMetricData[]
  ): { [uniqName: string]: SonarMetricData[] } {
    return data.reduce((acc, cur) => {
      const uniqName = `${cur.name}#${cur.labels.modelVersionId}`;
      if (acc[uniqName] === undefined) {
        acc[uniqName] = [];
      }

      acc[uniqName].push(cur);

      return acc;
    }, {});
  }

  private getRequest(
    timeInterval,
    metricSpecification,
    feature
  ): Observable<SonarMetricData[]> {
    if (this.isKolmogorovSmirnov(metricSpecification)) {
      return this.makeKolmogorovSmirnovRequest(
        timeInterval,
        metricSpecification,
        feature
      );
    } else {
      return this.makeRequest(timeInterval, metricSpecification);
    }
  }

  private makeSimpleRequest(
    timeInterval: TimeInterval,
    metricSpecification: MetricSpecification,
    feature: number
  ): Observable<ChartServiceData> {
    return this.getRequest(timeInterval, metricSpecification, feature).pipe(
      map(data => ({
        mainData: this.groupedDataByMetric(data),
        comparedData: null,
        flattenData: data,
      }))
    );
  }

  private makeComparedRequest(
    timeInterval: TimeInterval,
    metricSpecification: MetricSpecification,
    comparedModelVersionId: number,
    feature: number
  ): Observable<ChartServiceData> {
    return this.metricSettingsService
      .getMetricSettings(`${comparedModelVersionId}`)
      .pipe(
        map(comparedMetricSpecifications => {
          return comparedMetricSpecifications.find(
            (metricSpec: MetricSpecification) =>
              metricSpec.kind === metricSpecification.kind
          );
        }),
        switchMap(comparedMetricSpecification => {
          return forkJoin({
            mainData: this.getRequest(
              timeInterval,
              metricSpecification,
              feature
            ),
            comparedData: comparedMetricSpecification ? this.getRequest(
              timeInterval,
              comparedMetricSpecification,
              feature
            ) : of([]),
          });
        }),
        map(({mainData, comparedData}) => {
          return {
            mainData: this.groupedDataByMetric(mainData),
            comparedData: this.groupedDataByMetric(comparedData),
            flattenData: [...mainData, ...comparedData],
          };
        })
      );
  }

  private makeRequest(
    timeInterval: TimeInterval,
    metricSpecification: MetricSpecification
  ): Observable<SonarMetricData[]> {
    const fromInSeconds = `${Math.floor(timeInterval.from)}`;
    const tillInSeconds = `${Math.floor(timeInterval.to)}`;

    return this.monitoringService.getMetricsInRange(metricSpecification, {
      from: fromInSeconds,
      till: tillInSeconds,
    });
  }
  private makeKolmogorovSmirnovRequest(
    timeInterval: TimeInterval,
    metricSpecification: MetricSpecification,
    feature: number
  ): Observable<SonarMetricData[]> {
    const fromInSeconds = `${Math.floor(timeInterval.from)}`;
    const tillInSeconds = `${Math.floor(timeInterval.to)}`;

    return this.monitoringService.getMetricsInRange(metricSpecification, {
      from: fromInSeconds,
      till: tillInSeconds,
      columnIndex: `${feature}`,
    });
  }
}
