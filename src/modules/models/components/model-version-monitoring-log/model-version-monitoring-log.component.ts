import { Component, OnInit, OnDestroy } from '@angular/core';
import { HydroServingState, getSelectedMetric } from '@core/reducers';
import { MonitoringService, IMetricData } from '@core/services/metrics/monitoring.service';
import { ReqstoreService } from '@core/services/reqstore.service';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion, TimeInterval } from '@shared/_index';
import { MetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
import { ReqstoreEntry, ReqstoreLog } from '@shared/models/reqstore.model';
import { isEmptyObj } from '@shared/utils/is-empty-object';
import { Observable, BehaviorSubject, Subscription, combineLatest, of } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

type ILogEntry = ReqstoreEntry & {
    failed: boolean;
    metrics: any;
};

interface ILog {
    [timestamp: string]: ILogEntry[];
}

@Component({
    selector: 'hs-model-version-monitoring-log',
    templateUrl: 'model-version-monitoring-log.component.html',
    styleUrls: ['model-version-monitoring-log.component.scss'],
})
export class ModelVersionMonitoringLogComponent implements OnInit, OnDestroy {
    errors = true;
    metricSpecification$: Observable<MetricSpecification>;
    metricSpecificationProvider$: Observable<IMetricSpecificationProvider>;
    modelVersion$: Observable<IModelVersion>;

    selectedFeature: string = '';

    logError$: BehaviorSubject<any>;
    metrics: string[];
    metricDataFrom: IMetricData;
    metricDataTo: IMetricData;
    dateFrom: string;
    dateTo: string;
    chartTimeWidth: number = 1800000;
    chartTimeWidthParams: Array<{ ms: number, text: string }> = [
        { ms: 900000, text: '15 minutes' },
        { ms: 1800000, text: '30 minutes' },
        { ms: 3600000, text: '1 hour' },
        { ms: 7200000, text: '2 hours' },
        { ms: 14400000, text: '4 hours' },
    ];

    updateLogSub: Subscription;
    selectedTimeInterval$: BehaviorSubject<TimeInterval> = new BehaviorSubject(null);

    // reqstoreOptions
    maxMBytes: string = '1';
    maxMessages: string = '20';
    reverse: boolean = true;
    onlyFailedReqstoreData: boolean = true;
    updateReqstore$: BehaviorSubject<any> = new BehaviorSubject('');

    reqstoreLog: ReqstoreLog;
    sonarData: IMetricData[][];
    logLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    logData: ILog;
    logDataSub: Subscription;

    constructor(
        private store: Store<HydroServingState>,
        private reqstore: ReqstoreService,
        private monitoringService: MonitoringService
    ) {
        this.modelVersion$ = this.store.select(getSelectedModelVersion).pipe( filter(mv => !!mv));
        this.metricSpecification$ = this.store.select(getSelectedMetric).pipe( filter(ms => !!ms));

        this.logError$ = new BehaviorSubject(null);

        this.metricSpecificationProvider$ = this.metricSpecification$.pipe(
            filter(_ => !!_),
            map(_ => this.monitoringService.createMetricProviders(_))
        );
    }

    ngOnInit(): void {
        this.logDataSub = combineLatest(
            this.selectedTimeInterval$,
            this.modelVersion$,
            this.metricSpecification$,
            this.updateReqstore$
        ).pipe(
            filter(([timeInterval, _, ms]) => !!timeInterval && !!ms),
            switchMap(([interval, mv, ms]) => {
                this.logLoading$.next(true);
                const reqstoreLog$ = this.reqstoreRequest(interval, mv);
                const sonarData$ = this.sonarRequest(interval, mv, ms);
                return combineLatest(reqstoreLog$, sonarData$);
            })
        ).subscribe(
            ([reqstoreLog, sonarData]) => {
                this.logLoading$.next(false);
                this.sonarData = sonarData;
        });
    }

    ngOnDestroy(): void {
        this.logDataSub.unsubscribe();
    }

    onChangeFeature(feature) {
        this.selectedFeature = feature;
    }

    onSelectPoints(timeInterval: TimeInterval): void {
        if (timeInterval.from && timeInterval.to) {
            this.selectedTimeInterval$.next(timeInterval);
        }
    }

    updateReqstore() {
        this.updateReqstore$.next(true);
    }

    private reqstoreRequest(interval, modelVersion) {
        return of([]);
    }

    private sonarRequest(
        interval: TimeInterval,
        modelVersion: IModelVersion,
        metricSpecifications: MetricSpecification
    ): Observable<IMetricData[][]> {
        const options: any = {
            from: `${Math.floor(interval.from)}`,
            till: `${Math.floor(interval.to)}`,
        };

        if (this.onlyFailedReqstoreData) {
            options.health = '0';
        }

        const request = this.monitoringService.getMetricsInRange(
            metricSpecifications,
            options
        );

        return combineLatest(request);
    }

    private mapReqstorAndSonarToLog(
        reqstoreLog: ReqstoreLog,
        sonarData: IMetricData[][]
    ): ILog {
        if (isEmptyObj(reqstoreLog) || sonarData.length === 0) { return {}; }

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

                if (traces.length === 0) { continue; }

                traces.forEach(trace => {
                    if (trace) {
                        const [ts] = trace.split('_');
                        if (reqstoreLog[ts] !== undefined) {
                            if (log[ts] === undefined) {
                                log[ts] = reqstoreLog[ts][0];
                                log[ts].failed = false;
                                log[ts].metrics = {};
                            }

                            const metricKind = this.monitoringService.getSpecKindByMetricName(currentMetricData.name);

                            if (log[ts].metrics[metricKind] === undefined) {
                                log[ts].metrics[metricKind] = {};
                            }

                            const metricsByKind = log[ts].metrics[metricKind];
                            const columnIndex = +currentMetricData.labels.columnIndex || 0;
                            metricsByKind[columnIndex] = metricsByKind[columnIndex]  || {};

                            if (metricsByKind[columnIndex][currentMetricData.name] === undefined) {
                                metricsByKind[columnIndex][currentMetricData.name] = currentMetricData;
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
