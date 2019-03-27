import { Type } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HydroServingState, getSelectedMetric } from '@core/reducers';
import { MetricsService, IMetricData } from '@core/services/metrics/metrics.service';
import { ReqstoreService, IReqstoreLog } from '@core/services/reqstore.service';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion } from '@shared/_index';
import { IMetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
import { Observable, BehaviorSubject, combineLatest, Subject, of, merge, ReplaySubject, Subscription } from 'rxjs';
import { map, tap, filter, switchMap, withLatestFrom, timestamp } from 'rxjs/operators';

interface LogItem {
    count: number;
    failed: number;
    entities: any[];
}
interface Log {
    [timestamp: string]: LogItem;
}

@Component({
    selector: 'hs-model-version-monitoring-log',
    templateUrl: 'model-version-monitoring-log.component.html',
    styleUrls: ['model-version-monitoring-log.component.scss'],
})
export class ModelVersionMonitoringLogComponent implements OnInit,OnDestroy {
    metricSpecification$: Observable<IMetricSpecification>;
    metricSpecificationProvider$: Observable<IMetricSpecificationProvider>;
    modelVersion$: Observable<IModelVersion>;

    onClickGetLog: Subject<any>;
    log: ReplaySubject<Log>;
    log$: Observable<Log>;

    logError$: BehaviorSubject<any>;
    selectedLogItem: LogItem;

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

    constructor(
        private store: Store<HydroServingState>,
        private reqstore: ReqstoreService,
        private metricService: MetricsService
    ) {
        this.modelVersion$ = this.store.select(getSelectedModelVersion);
        this.metricSpecification$ = this.store.select(getSelectedMetric);

        this.onClickGetLog = new Subject();
        this.log = new ReplaySubject(1);
        this.log$ = this.log.asObservable();
        this.logError$ = new BehaviorSubject(null);

        this.metricSpecificationProvider$ = this.metricSpecification$.pipe(
            filter(_ => !!_),
            map(_ => this.metricService.createMetricProviders(_))
        );

        this.updateLogSub = combineLatest(
            this.modelVersion$,
            this.metricSpecificationProvider$,
            this.onClickGetLog
            ).pipe(
                tap(([mv, msp]) => this.metrics = msp.metrics),
                switchMap(([mv, msp]) => this.getData(mv, msp)),
                map(([reqstoreData, sonarData]) => this.toLog(reqstoreData, sonarData)),
                tap(_ => {
                    this.logError$.next(null);
                    this.log.next(_);
                    this.selectedLogItem = _[Object.keys(_)[0]];
                })
        ).subscribe();

    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.updateLogSub.unsubscribe();
    }

    onSelectPoints({from, to}: {from: IMetricData, to: IMetricData}): void {
        try {
            if (from) {
                this.metricDataFrom = from;
                const { trace, traces} = from.labels;
                let traceArr;
                if (trace) {
                    this.dateFrom = this.getTimestampFromTrace(trace);
                } else {
                    traceArr = this.parseTraces(traces);
                    this.dateFrom = this.getTimestampFromTrace(traceArr[0]);
                }
            }

            if (to) {
                this.metricDataTo = to;
                const { trace, traces} = to.labels;
                let traceArr;
                if (trace) {
                    this.dateTo = this.getTimestampFromTrace(trace);
                } else {
                    traceArr = this.parseTraces(traces);
                    this.dateTo = this.getTimestampFromTrace(traceArr[0]);
                }
            } else {
                this.metricDataTo = undefined;
                this.dateTo = undefined;
            }
        } catch (error) {
            this.logError$.next(`${error.name}: ${error.message}`);
        }
    }

    selectLogItem(logItem) {
        this.selectedLogItem = logItem;
    }

    getLog() {
        this.onClickGetLog.next('click');
    }

    private parseTraces(traces): string[] {
        try {
            return JSON.parse(traces);
        } catch (error) {
            throw new Error(`Can't parse traces`);
        }
    }

    private getTimestampFromTrace(trace: string): string {
        return trace.split('_')[0];
    }

    private getData(
        modelVersion: IModelVersion,
        metricSpecificationProvider: IMetricSpecificationProvider): Observable<[IReqstoreLog, IMetricData[]]> {
                return combineLatest(
                    this.reqstore.getData(modelVersion.id.toString(), this.dateFrom, this.dateTo),
                    this.metricService.getMetrics(
                        modelVersion.id.toString(),
                        this.chartTimeWidth + '',
                        metricSpecificationProvider.metrics, '')
                );
    }

    // TODO: binary search
    // multiple metrics
    private findIndex(arr: IMetricData[] = []): number {
        let res;
        const ts = this.metricDataFrom.timestamp;

        for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i].timestamp === ts) { res = i; }
        }

        if (res !== undefined) {
            return res;
        } else {
            throw new Error(`Not found timestamp ${ts} in sonar data`);
        }
    }

    private toLog(
        reqstoreData: IReqstoreLog,
        sonarData: IMetricData[]
    ): Log {

        console.group('data');
        console.dir(reqstoreData);
        console.dir(sonarData);
        console.groupEnd();

        const log: Log = {};
        if (!reqstoreData || !sonarData) { return {}; }

        const length = (sonarData.length / this.metrics.length);

        try {
            const index = this.findIndex(sonarData);

            for (let i = index, l = length; i < l; i++ ) {
                const traces = JSON.parse(sonarData[i].labels.traces);

                traces.forEach(trace => {
                    const [ts, uid] = trace.split('_');
                    if (reqstoreData[ts] !== undefined) {
                        if (log[ts] === undefined) {
                            log[ts] = { count:  0, failed: 0, entities: []};
                        }

                        if (sonarData[i].health === false ) {
                            log[ts] = {...log[ts], failed: log[ts].failed + 1};
                        }

                        log[ts] = {...log[ts], count: log[ts].count + 1};

                        if (reqstoreData[ts][uid]) {
                            log[ts].entities.push({...reqstoreData[ts][uid], metricData: sonarData[i] });
                        }

                    }
                });
            }
        } catch (error) {
            this.logError$.next(error);
        }
        return log;
    }
}
