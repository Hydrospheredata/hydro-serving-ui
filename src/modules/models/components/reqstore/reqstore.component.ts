
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HydroServingState } from '@core/reducers';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { ReqstoreService } from '@core/services/reqstore.service';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { ITimeInterval, IModelVersion } from '@shared/_index';
import { IMetricSpecification } from '@shared/models/metric-specification.model';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'hs-reqstore',
    templateUrl: './reqstore.component.html',
    styleUrls: ['./reqstore.component.scss'],
})
export class ReqstoreComponent implements OnInit, AfterViewInit {
    timeInterval: ITimeInterval;
    selectedModelVersion$: Observable<IModelVersion>;
    metricSpecs$: Observable<IMetricSpecification[]>;

    timeInterval$: Subject<ITimeInterval> = new Subject();
    reqStoreData;
    sonarData;

    logData;

    constructor(
       public cd: ChangeDetectorRef,
       public store: Store<HydroServingState>,
       public reqstore: ReqstoreService,
       private metricSettingsService: MetricSettingsService,
       private monitoringService: MonitoringService
    ) {
        this.selectedModelVersion$ = this.store.select(getSelectedModelVersion);
        this.metricSpecs$ = this.selectedModelVersion$.pipe(
            switchMap( mv => this.metricSettingsService.getMetricSettings(`${mv.id}`))
        );

        combineLatest(this.timeInterval$, this.selectedModelVersion$, this.metricSpecs$)
            .pipe(
                switchMap(([interval, mv, ms]) => {
                    const reqstoreData$ = this.reqstoreRequest(interval, mv);
                    const sonarData$ = this.sonarRequest(interval, mv, ms);
                    return combineLatest(reqstoreData$, sonarData$);
                })
            )
            .subscribe(
                ([reqstoreData, sonarData]) => {
                    this.reqStoreData = reqstoreData;
                    this.sonarData = sonarData;

                    console.dir(reqstoreData);
                    console.dir(sonarData);

                    const log = {};
                    const metricsCount = sonarData.length;

                    for (let i = 0; i < metricsCount; i++) {
                        const currentMetricData = sonarData[i];

                        for (let j = 0; j < currentMetricData.length; j++) {
                            let traces = [];
                            try {
                                traces = JSON.parse(currentMetricData[j].labels.traces);
                            } catch (e) {
                                // console.error(e);
                                try {
                                    traces = [JSON.parse(currentMetricData[j].labels.trace)];
                                } catch (e) {
                                    console.error(e);
                                }
                            }

                            if (traces.length === 0) { continue; }

                            traces.forEach(trace => {
                                const [ts, uid] = trace.split('_');
                                if (reqstoreData[ts] !== undefined) {
                                    if (log[ts] === undefined) {
                                        log[ts] = reqstoreData[ts][0];
                                        log[ts].failed = false;
                                        log[ts].metrics = {
                                        };
                                    }

                                    if (log[ts].metrics[currentMetricData[j].name] === undefined) {
                                        log[ts].metrics[currentMetricData[j].name] = currentMetricData[j];
                                    }

                                    if (currentMetricData[j].health === false) {
                                        log[ts].failed = true;
                                    }
                                }

                            });
                        }
                    }

                    this.logData = log;

                }
            );
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    onChangeTimeInterval(timeInterval: ITimeInterval): void {
        this.timeInterval = timeInterval;
        this.timeInterval$.next(timeInterval);
    }

    private reqstoreRequest(interval, modelVersion) {
        return this.reqstore.getData(
            modelVersion.id,
            interval.from,
            interval.to,
            {
                maxBytes: '1000000',
                maxMessages: '1030',
                reverse: 'true',
                }
            );
    }

    private sonarRequest(interval, modelVersion, ms) {
        const requests = ms
        .map(mS => {
            if (mS.kind === 'KSMetricSpec') {
                return this.monitoringService.getMetricsInRange(
                    `${modelVersion.id}`,
                    this.monitoringService.getMetricsBySpecKind(mS.kind),
                    {
                        from: `${Math.floor(interval.from / 1000)}`,
                        till: `${Math.floor(interval.to / 1000)}`,
                        columnIndex: '0',
                    }
                );
            } else {
                return this.monitoringService.getMetricsInRange(
                    `${modelVersion.id}`,
                    this.monitoringService.getMetricsBySpecKind(mS.kind),
                    {
                        from: `${Math.floor(interval.from / 1000)}`,
                        till: `${Math.floor(interval.to / 1000)}`,
                    }
                );
            }

        });

        return combineLatest(...requests);
    }
}
