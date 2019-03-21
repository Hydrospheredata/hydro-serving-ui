import { Component, OnInit } from '@angular/core';
import { HydroServingState, getSelectedMetric } from '@core/reducers';
import { ReqstoreService } from '@core/services/reqstore.service';
import { Store } from '@ngrx/store';
import { IMetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
    selector: 'hs-model-version-monitoring-log',
    templateUrl: 'model-version-monitoring-log.component.html',
    styleUrls: ['model-version-monitoring-log.component.scss'],
})
export class ModelVersionMonitoringLogComponent implements OnInit {
    source$: Observable<IMetricSpecification>;
    metricSpecificationProvider$: Observable<IMetricSpecificationProvider>;
    log$: BehaviorSubject<any>;
    logError$: BehaviorSubject<any>;
    logResponseRequest$: BehaviorSubject<any>;
    dateFrom: string;
    dateTo: string;
    chartTimeWidth: number = 1800000;
    selectedLogItem: number;

    constructor(
        private store: Store<HydroServingState>,
        private reqstore: ReqstoreService
    ) {
        this.source$ = this.store.select(getSelectedMetric);
        this.log$ = new BehaviorSubject(null);
        this.logError$ = new BehaviorSubject(null);
        this.logResponseRequest$ = new BehaviorSubject([]);
    }

    ngOnInit(): void {
        this.metricSpecificationProvider$ = this.source$.pipe(
            filter(_ => !!_),
            map(_ => this.createMetricProviders(_))
        );
    }

    onSelectPoints({dateFrom, dateTo}: {dateFrom: any, dateTo: any}): void {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    selectLogItem(logItem) {
        this.selectedLogItem = logItem;
        this.logResponseRequest$.next(this.log$.getValue()[logItem.key]);
    }

    isSelected(logItem): boolean {
        return this.selectedLogItem === logItem;
    }

    getLog() {
        this.reqstore
            .getData(this.dateFrom, this.dateTo)
            .subscribe(
                _ => {
                    this.logError$.next(null);
                    this.log$.next(_);
                },
                error => {
                    this.logError$.next(error);
                }
            );
    }

    private createMetricProviders(
        metricSpecification: IMetricSpecification
    ): IMetricSpecificationProvider  {
        const dict = {
            CounterMetricSpec:      ['counter'],
            KSMetricSpec:           ['kolmogorovsmirnov', 'kolmogorovsmirnov_level'],
            AEMetricSpec:           ['autoencoder_reconstruction'],
            RFMetricSpec:           ['randomforest'],
            GANMetricSpec:          ['gan_outlier', 'gan_inlier'],
            LatencyMetricSpec:      ['latency'],
            ErrorRateMetricSpec:    ['error_rate'],
        };

        return {
            kind: metricSpecification.kind,
            byModelVersionId: { id: metricSpecification },
            metrics: dict[metricSpecification.kind],
        };
    }
}
