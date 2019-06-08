import { Injectable } from '@angular/core';
import {
  MonitoringService,
  IMetricData,
} from '@core/services/metrics/monitoring.service';
import { ReqstoreService } from '@core/services/reqstore.service';
import { TimeInterval } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';
import { ReqstoreLog, ReqstoreEntry } from '@shared/models/reqstore.model';
import * as _ from 'lodash';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

type LogEntry = ReqstoreEntry & {
  failed: boolean;
  metrics: {
    [metricKind: string]: {
      [columnIndex: string]: {
        [metricName: string]: any;
      };
    };
  };
};

interface RequestResponseLog {
  [timestamp: string]: LogEntry[];
}

@Injectable({
  providedIn: 'root',
})
export class RequestResponseLogService {
  constructor(
    private monitoringService: MonitoringService,
    private reqstoreService: ReqstoreService
  ) {}

  getLog({
    timeInterval,
    modelVersion,
    metricSpecifications,
  }): Observable<any> {
    const reqstoreLog$ = this.reqstoreRequest({ timeInterval, modelVersion });
    const sonarData$ = this.sonarRequest({
      timeInterval,
      metricSpecifications,
    });
    return combineLatest(reqstoreLog$, sonarData$).pipe(
      map(([reqstoreLog, sonarData]) => {
        this.mapReqstorAndSonarToLog(reqstoreLog, sonarData);
      })
    );
  }

  private reqstoreRequest({
    timeInterval,
    modelVersion,
    maxMBytes = 1000,
    maxMessages = 25,
    reverse = true,
  }) {
    return this.reqstoreService.getData({
      modelVersionId: modelVersion.id,
      from: `${timeInterval.from}`,
      till: `${timeInterval.to}`,
      maxBytes: `${+maxMBytes * 1024 * 1024}`,
      maxMessages: `${maxMessages}`,
      reverse: reverse ? 'true' : 'false',
    });
  }

  private sonarRequest({
    timeInterval,
    metricSpecifications,
    onlyFailedReqstoreData = false,
  }: {
    timeInterval: TimeInterval;
    metricSpecifications: MetricSpecification[];
    onlyFailedReqstoreData?: boolean;
  }): Observable<IMetricData[][]> {
    const options: {
      from: string;
      till: string;
      health?: string;
    } = {
      from: `${Math.floor(timeInterval.from)}`,
      till: `${Math.floor(timeInterval.to)}`,
    };

    if (onlyFailedReqstoreData) {
      options.health = '0';
    }

    const requests = metricSpecifications.map(metricSpec =>
      this.monitoringService.getMetricsInRange(metricSpec, options)
    );

    return combineLatest(requests);
  }

  private mapReqstorAndSonarToLog(
    reqstoreLog: ReqstoreLog,
    sonarData: IMetricData[][]
  ): RequestResponseLog {
    if (_.isEmpty(reqstoreLog) || sonarData.length === 0) {
      return {};
    }

    const log = {};
    const metricsCount = sonarData.length;

    for (let i = 0; i < metricsCount; i++) {
      const currentMetricDataArray = sonarData[i];

      for (const currentMetricData of currentMetricDataArray) {
        let traces = [];
        try {
          traces = JSON.parse(currentMetricData.labels.traces);
        } catch (e) {
          // console.error(e);
          try {
            traces = [JSON.parse(currentMetricData.labels.trace)];
          } catch (e) {
            console.error(e);
          }
        }

        if (traces.length === 0) {
          continue;
        }

        traces.forEach(trace => {
          if (trace) {
            const [ts] = trace.split('_');
            if (reqstoreLog[ts] !== undefined) {
              if (log[ts] === undefined) {
                log[ts] = reqstoreLog[ts][0];
                log[ts].failed = false;
                log[ts].metrics = {};
              }

              const metricKind = this.monitoringService.getSpecKindByMetricName(
                currentMetricData.name
              );

              if (log[ts].metrics[metricKind] === undefined) {
                log[ts].metrics[metricKind] = {};
              }

              const metricsByKind = log[ts].metrics[metricKind];
              const columnIndex = +currentMetricData.labels.columnIndex || 0;
              metricsByKind[columnIndex] = metricsByKind[columnIndex] || {};

              if (
                metricsByKind[columnIndex][currentMetricData.name] === undefined
              ) {
                metricsByKind[columnIndex][
                  currentMetricData.name
                ] = currentMetricData;
              }

              if (currentMetricData.health === false) {
                log[ts].failed = true;
              }
            }
          }
        });
      }
    }

    return log;
  }
}
