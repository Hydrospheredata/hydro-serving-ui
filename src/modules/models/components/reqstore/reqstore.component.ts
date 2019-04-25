
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService, IMetricData } from '@core/services/metrics/monitoring.service';
import { ReqstoreService } from '@core/services/reqstore.service';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { ITimeInterval, IModelVersion } from '@shared/_index';
import { IMetricSpecification } from '@shared/models/metric-specification.model';
import { IReqstoreEntry, IReqstoreLog } from '@shared/models/reqstore.model';
import { isEmptyObj } from '@shared/utils/is-empty-object';
import { Observable, Subject, combineLatest, BehaviorSubject, merge, Subscription } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

type ILogEntry = IReqstoreEntry & {
    failed: boolean;
    metrics: any;
};

type ILogEntry2 = IReqstoreEntry & {
    failed: boolean;
    metrics: {
        [metricKind: string]: {
            [columnIndex: string]: {
                [metricName: string]: any
            }
        }
    };
};

interface ILog {
    [timestamp: string]: ILogEntry[];
}

@Component({
    selector: 'hs-reqstore',
    templateUrl: './reqstore.component.html',
    styleUrls: ['./reqstore.component.scss'],
})
export class ReqstoreComponent implements OnInit, OnDestroy {
    timeInterval: ITimeInterval;
    timeInterval$: Subject<ITimeInterval> = new Subject();

    selectedModelVersion$: Observable<IModelVersion>;
    metricSpecs$: Observable<IMetricSpecification[]>;

    reqstoreLog: IReqstoreLog;
    sonarData: IMetricData[][];
    logLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    logData: ILog;
    logDataSub: Subscription;

    // reqstoreOptions
    maxMBytes: string = '1';
    maxMessages: string = '20';
    reverse: boolean = true;
    onlyFailedReqstoreData: boolean = true;
    updateReqstore$: BehaviorSubject<any> = new BehaviorSubject('');

    constructor(
       public cd: ChangeDetectorRef,
       public store: Store<HydroServingState>,
       public reqstore: ReqstoreService,
       private metricSettingsService: MetricSettingsService,
       private monitoringService: MonitoringService
    ) {
        this.selectedModelVersion$ = this.store.select(getSelectedModelVersion).pipe(
            filter( mv => !!mv)
        );
        this.metricSpecs$ = this.selectedModelVersion$.pipe(
            switchMap(mv => this.metricSettingsService.getMetricSettings(`${mv.id}`))
        );
    }

    ngOnInit(): void {
        this.logDataSub = combineLatest(
            this.timeInterval$,
            this.selectedModelVersion$,
            this.metricSpecs$,
            this.updateReqstore$
        ).pipe(
                filter(([timeInterval]) => !!timeInterval),
                switchMap(([interval, mv, ms]) => {
                    this.logLoading$.next(true);
                    const reqstoreLog$ = this.reqstoreRequest(interval, mv);
                    const sonarData$ = this.sonarRequest(interval, mv, ms);
                    return combineLatest(reqstoreLog$, sonarData$);
                })
            ).subscribe(
                ([reqstoreLog, sonarData]) => {
                    this.logLoading$.next(false);
                    this.reqstoreLog = reqstoreLog;
                    this.sonarData = sonarData;
                    this.logData = this.mapReqstorAndSonarToLog(reqstoreLog, sonarData);
            }
        );
    }

    ngOnDestroy(): void {
        this.logDataSub.unsubscribe();
    }

    onChangeTimeInterval(timeInterval: ITimeInterval): void {
        this.timeInterval = timeInterval;
        this.timeInterval$.next(timeInterval);
    }

    updateReqstore() {
        this.updateReqstore$.next(true);
    }

    private reqstoreRequest(interval, modelVersion) {
        return this.reqstore.getData(
            modelVersion.id,
            interval.from,
            interval.to,
            {
                maxBytes: `${+this.maxMBytes * 1024 * 1024}`,
                maxMessages: this.maxMessages,
                reverse: this.reverse ? 'true' : 'false',
            }
        );
    }

    private sonarRequest(
        interval: ITimeInterval,
        modelVersion: IModelVersion,
        metricSpecifications: IMetricSpecification[]
    ): Observable<IMetricData[][]> {
        const requests = metricSpecifications
            .map(mS => {
                const options: any = {
                    from: `${Math.floor(interval.from / 1000)}`,
                    till: `${Math.floor(interval.to / 1000)}`,
                };

                if(this.onlyFailedReqstoreData) {
                    options.health = '0';
                }

                return this.monitoringService.getMetricsInRange(
                    `${modelVersion.id}`,
                    this.monitoringService.getMetricsBySpecKind(mS.kind),
                    options
                );
            });

        return combineLatest(requests);
    }

    private mapReqstorAndSonarToLog(
        reqstoreLog: IReqstoreLog,
        sonarData: IMetricData[][]
    ): ILog {
        if (isEmptyObj(reqstoreLog) || sonarData.length === 0) { return {}; }

        const log = {};
        const metricsCount = sonarData.length;

        for (let i = 0; i < metricsCount; i++) {
            const currentMetricDataArray = sonarData[i];

            for (let j = 0; j < currentMetricDataArray.length; j++) {
                const currentMetricData = currentMetricDataArray[j];

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

                            if (log[ts].metrics[metricKind][+currentMetricData.labels.columnIndex || 0] === undefined) {
                                log[ts].metrics[metricKind][+currentMetricData.labels.columnIndex || 0] = {};
                            }

                            if (log[ts].metrics[metricKind][+currentMetricData.labels.columnIndex || 0][currentMetricData.name] === undefined) {
                                log[ts].metrics[metricKind][+currentMetricData.labels.columnIndex || 0][currentMetricData.name] = currentMetricData;
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
