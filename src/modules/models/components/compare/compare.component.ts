import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { HydroServingState } from '@core/reducers';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { getAllModels, getModelVersionsByModelId } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModel, IModelVersion } from '@shared/_index';
import { IMetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
import { Observable, Subject, combineLatest, BehaviorSubject, of } from 'rxjs';
import { filter, switchMap, map, tap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hs-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit, OnDestroy {
    models$: Observable<IModel[]>;
    firstModelVersionsList$: Observable<IModelVersion[]>;
    secondModelVersionsList$: Observable<IModelVersion[]>;

    metricSpecificationsSubject: BehaviorSubject<IMetricSpecification[]> = new BehaviorSubject([]);

    metricKindList$: Observable<string[]>;
    metricProvider$: Subject<IMetricSpecificationProvider> = new Subject();

    model: AbstractControl = new FormControl('');
    modelChanges$: Observable<any>;

    firstModelVersion: AbstractControl = new FormControl('');
    firstModelVersionChanges$: Observable<any>;

    secondModelVersion: AbstractControl = new FormControl('');
    secondModelVersionChanges$: Observable<any>;

    metricKind: AbstractControl = new FormControl('');
    metricKindChanges$: Observable<any>;

    public chartTimeWidth: number = 1800000;
    public chartTimeWidthParams: Array<{ ms: number, text: string }> = [
        { ms: 900000, text: '15 minutes' },
        { ms: 1800000, text: '30 minutes' },
        { ms: 3600000, text: '1 hour' },
        { ms: 7200000, text: '2 hours' },
        { ms: 14400000, text: '4 hours' },
    ];

    private close: Subject <any> = new Subject();

    constructor(
        store: Store<HydroServingState>,
        metricService: MetricSettingsService
    ) {
        this.models$ = store.select(getAllModels);
        this.modelChanges$ = this.model.valueChanges;
        this.firstModelVersionChanges$ = this.firstModelVersion.valueChanges;
        this.secondModelVersionChanges$ = this.secondModelVersion.valueChanges;
        this.metricKindChanges$ = this.metricKind.valueChanges;

        this.firstModelVersionsList$ = this.modelChanges$.pipe(
            filter(id => id !== undefined),
            switchMap(id => store.select(getModelVersionsByModelId(id)))
        );

        this.firstModelVersionsList$.pipe(
            takeUntil(this.close),
            tap(_ => this.firstModelVersion.setValue(_[0]))
        ).subscribe();

        this.secondModelVersionsList$ = combineLatest(
            this.firstModelVersionChanges$,
            this.firstModelVersionsList$
        ).pipe(
            map(([{id: firstId}, list]) => list.filter(({id}) => id !== firstId)),
            tap(modelVersions => this.secondModelVersion.setValue(modelVersions[0]))
        );

        // metrics
        combineLatest(
            this.firstModelVersionChanges$,
            this.secondModelVersionChanges$
        ).pipe(
            takeUntil(this.close),
            filter(([first, second]) => !!first && !!second),
            switchMap(modelVersions => {
                const requests = [];
                modelVersions.forEach(({id}) => {
                    requests.push(metricService.getMetricSettings(`${id}`));
                });

                return combineLatest(...requests);
            }),
            tap(([
                primaryMericSpecifications,
                secondaryMetricSpecifications,
            ]: IMetricSpecification[][]) => {
                this.metricSpecificationsSubject.next(
                    [...primaryMericSpecifications, ...secondaryMetricSpecifications]
                );
            })
        ).subscribe();

        this.metricKindList$ = this.metricSpecificationsSubject.asObservable().pipe(
            map(metricSpecifications => {
                const tmp = {};

                return metricSpecifications.reduce((kinds, { kind }) => {
                    if (tmp[kind] === undefined) {
                        tmp[kind] = true;
                        kinds.push(kind);
                    }

                    return kinds;
                }, []);
            }),
            tap(kinds => {
                if (!kinds.includes(this.metricKind.value)) {
                    this.metricKind.setValue(kinds[0]);
                }
            })
        );

        combineLatest(this.metricKindChanges$, this.metricSpecificationsSubject)
            .pipe(
                takeUntil(this.close),
                tap(([selectedMetricKind, metricList]) => {
                    const metricSpecs = metricList.filter(({kind}) => kind === selectedMetricKind);

                    if (metricSpecs.length) {
                        const provider = this.createMetricProviders(metricSpecs, selectedMetricKind);
                        this.metricProvider$.next(provider);
                    }
                })
        ).subscribe();
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.close.next();
        this.close.complete();
    }

    private createMetricProviders(
            metricSpecifications: IMetricSpecification[],
            kind
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

        const tmp: IMetricSpecificationProvider = {
            kind,
            byModelVersionId: {},
            metrics: dict[kind],
        };

        metricSpecifications.forEach(metricSpec => {
            tmp.byModelVersionId[metricSpec.modelVersionId] = metricSpec;
        });

        return tmp;
    }
}
