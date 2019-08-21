import { Injectable } from '@angular/core';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { MonitoringAggregationItem } from '@shared/models/monitoring-aggregation.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonitoringPageService {
  constructor(private monitoringService: MonitoringService) {}
  loadAggregation({
    metricSpecifications,
    timeBoundary,
  }: {
    timeBoundary?: any;
    metricSpecifications: any;
  }): Observable<{
    [metricSpecId: string]: Observable<MonitoringAggregationItem[]>;
  }> {
    if (timeBoundary === 0) {
      return this.loadFullAggregation({ metricSpecifications });
    } else {
      return this.loadFullAggregationInBoundary({
        metricSpecifications,
        timeBoundary,
      });
    }
  }

  loadDetailedAggregation({
    metricSpecifications,
    timeInterval,
  }: {
    metricSpecifications: MetricSpecification[];
    timeInterval: TimeInterval;
  }) {
    const requestsMap = metricSpecifications.reduce(
      (res, metricSpecification) => {
        return {
          ...res,
          [metricSpecification.id]: this.monitoringService.getAggregation({
            metricSpecification,
            from: `${Math.floor(timeInterval.from)}`,
            till: `${Math.floor(timeInterval.to)}`,
            steps: '50',
          }),
        };
      },
      {}
    );

    return forkJoin(requestsMap);
  }

  loadData(params: {
    timeInterval?: any;
    timeBoundary?: any;
  }): { reqstore: any; sonar: any } {
    return { reqstore: [], sonar: [] };
  }

  private loadFullAggregation({
    metricSpecifications,
  }: {
    metricSpecifications: MetricSpecification[];
  }): Observable<{
    [metricSpecId: string]: Observable<MonitoringAggregationItem[]>;
  }> {
    const requestsMap = metricSpecifications.reduce(
      (res, metricSpecification) => {
        return {
          ...res,
          [metricSpecification.id]: this.monitoringService.getAggregation({
            metricSpecification,
            steps: '200',
          }),
        };
      },
      {}
    );

    return forkJoin(requestsMap);
  }
  private loadFullAggregationInBoundary({
    metricSpecifications,
    timeBoundary,
  }: {
    metricSpecifications: MetricSpecification[];
    timeBoundary: any;
  }): Observable<{
    [metricSpecId: string]: Observable<MonitoringAggregationItem[]>;
  }> {
    const tillInMs = new Date().getTime();
    const fromInMs = tillInMs - timeBoundary;

    return forkJoin(
      metricSpecifications.reduce((res, metricSpecification) => {
        return {
          ...res,
          [metricSpecification.id]: this.monitoringService.getAggregation({
            metricSpecification,
            steps: '200',
            from: `${Math.floor(fromInMs)}`,
            till: `${Math.floor(tillInMs)}`,
          }),
        };
      }, {})
    );
  }
}
