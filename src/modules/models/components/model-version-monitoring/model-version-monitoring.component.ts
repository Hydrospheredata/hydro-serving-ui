import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetMetricsAction } from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import * as fromMetrics from '@core/reducers';
import { DialogService } from '@dialog/dialog.service';
import { DialogAddMetricComponent, DialogDeleteMetricComponent, METRIC_ID_VALUE } from '@models/components/dialogs';
import { getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { ModelVersion } from '@shared/_index';
import { IMetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
import { Observable, Subscription, of, combineLatest } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'hs-model-version-monitoring',
    templateUrl: './model-version-monitoring.component.html',
    styleUrls: ['model-version-monitoring.component.scss'],
})
export class ModelVersionMonitoringComponent implements OnInit, OnDestroy {
    public isMonitoringAvailable$: Observable<boolean> = of(false);
    public modelVersion$: Observable<ModelVersion>;
    public metricSpecificationProviders$: Observable<IMetricSpecificationProvider[]>;

    public chartTimeWidth: number = 1800000;
    public chartTimeWidthParams: Array<{ ms: number, text: string }> = [
        { ms: 900000, text: '15 minutes' },
        { ms: 1800000, text: '30 minutes' },
        { ms: 3600000, text: '1 hour' },
        { ms: 7200000, text: '2 hours' },
        { ms: 14400000, text: '4 hours' },
    ];
    private updateMetricsSub: Subscription;

    constructor(
        private dialog: DialogService,
        private store: Store<HydroServingState>
    ) {
        this.modelVersion$ = this.store.select(getSelectedModelVersion).pipe(
            filter(modelVersion => !!modelVersion)
        );

        this.metricSpecificationProviders$ = this.store.select(fromMetrics.getSelectedMetrics).pipe(
            filter(metricSpecs => !!metricSpecs),
            switchMap(metricSpecifications => {
                return of(this.createMetricProviders(metricSpecifications));
            })
        );

        this.isMonitoringAvailable$ = combineLatest(this.modelVersion$).pipe(
            switchMap(([modelVersion]) => of(!!modelVersion))
        );
    }

    ngOnInit(): void {
        this.updateMetricsSub = this.modelVersion$.pipe(
            tap(({id}) => {
                this.store.dispatch(new GetMetricsAction(`${id}`));
            }
        )).subscribe();
    }

    ngOnDestroy(): void {
        this.updateMetricsSub.unsubscribe();
    }

    public openAddMetricDialog(): void {
        this.dialog.createDialog({
            component: DialogAddMetricComponent,
            styles: {
                width: '600px',
                height: '600px',
            },
        });
    }

    deleteMetric(id: number): void {
        this.dialog.createDialog({
            component: DialogDeleteMetricComponent,
            providers: [{ provide: METRIC_ID_VALUE, useValue: id }],
        });
    }

    private createMetricProviders(
        metricSpecifications: IMetricSpecification[]
    ): IMetricSpecificationProvider[] {
        const dict = {
            CounterMetricSpec:      ['counter'],
            KSMetricSpec:           ['kolmogorovsmirnov', 'kolmogorovsmirnov_level'],
            AEMetricSpec:           ['autoencoder_reconstruction'],
            RFMetricSpec:           ['randomforest'],
            GANMetricSpec:          ['gan_outlier', 'gan_inlier'],
            LatencyMetricSpec:      ['latency'],
            ErrorRateMetricSpec:    ['error_rate'],
        };

        return metricSpecifications.map(metricSpec => {
            return {...metricSpec, metrics: dict[metricSpec.kind] };
        });
    }
}
