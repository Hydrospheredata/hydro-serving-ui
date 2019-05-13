import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { HydroServingState } from '@core/reducers';
import { MetricSettingsService } from '@core/services/metrics/_index';
import { MonitoringService } from '@core/services/metrics/monitoring.service';
import { getModelVersionsByModelId, getSelectedModelId, getSelectedModelVersion } from '@models/reducers';
import { Store } from '@ngrx/store';
import { IModelVersion } from '@shared/_index';
import { IMetricSpecification, IMetricSpecificationProvider } from '@shared/models/metric-specification.model';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { filter, switchMap, map, tap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'hs-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit, OnDestroy {
    selectedModelId$: Observable<number>;
    selectedModelVersion$: Observable<IModelVersion>;
    modelVersionList$: Observable<IModelVersion[]>;
    secondModelVersionsList$: Observable<IModelVersion[]>;

    metricSpecificationsSubject: BehaviorSubject<IMetricSpecification[]> = new BehaviorSubject([]);

    metricKindList$: Observable<string[]>;
    metricProvider$: Subject<IMetricSpecificationProvider> = new Subject();

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
        metricService: MetricSettingsService,
        public monitoringService: MonitoringService
    ) {
        this.selectedModelId$ = store.select(getSelectedModelId).pipe(filter(_ => !!_));
        this.selectedModelVersion$ = store.select(getSelectedModelVersion).pipe(filter(_ => !!_));
        this.secondModelVersionChanges$ = this.secondModelVersion.valueChanges;
        this.metricKindChanges$ = this.metricKind.valueChanges;

        this.modelVersionList$ = this.selectedModelId$.pipe(
            filter(id => id !== undefined),
            switchMap(id => store.select(getModelVersionsByModelId(id)))
        );

        this.secondModelVersionsList$ = combineLatest(
            this.selectedModelVersion$,
            this.modelVersionList$
        ).pipe(
            map(([{id: modelVerId}, list]) => list.filter(({id}) => id !== modelVerId)),
            tap(modelVersions => this.secondModelVersion.setValue(modelVersions[0]))
        );

        // metrics
        combineLatest(
            this.selectedModelVersion$,
            this.secondModelVersionChanges$
        ).pipe(
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
            }),
            takeUntil(this.close)
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
        const tmp: IMetricSpecificationProvider = {
            kind,
            byModelVersionId: {},
            metrics: this.monitoringService.getMetricsBySpecKind(kind),
        };

        metricSpecifications.forEach(metricSpec => {
            tmp.byModelVersionId[metricSpec.modelVersionId] = metricSpec;
        });

        return tmp;
    }
}
