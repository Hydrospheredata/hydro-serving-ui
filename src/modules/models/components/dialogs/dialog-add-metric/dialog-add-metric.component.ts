import { Subscription ,  Observable, of, combineLatest } from 'rxjs';
import { switchMap, take, tap, startWith, withLatestFrom } from 'rxjs/operators';

import { Application } from '@shared/models/application.model';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MdlSnackbarService } from '@angular-mdl/core';

import * as fromApplications from '@applications/reducers';
import * as HydroActions from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';

import { FormsService } from '@core/services';
import { DialogService } from '@dialog/dialog.service';
import { IModelVersion, ModelVersion } from '@shared/_index';
import { IMetricSpecificationRequest } from '@shared/models/metric-specification.model';

interface IMetricSpecifiocationKind {
    name: string;
    className: string;
}

@Component({
    templateUrl: './dialog-add-metric.component.html',
    styleUrls: ['./dialog-add-metric.component.scss'],
})
export class DialogAddMetricComponent implements OnDestroy, OnInit {
    public form: FormGroup;

    public applications$: Observable<Application[]>;
    public sources$: Observable<string[]>;
    public applicationSub: Subscription;
    public application: Application;
    public stageId: number;

    public metricSpecificationKinds: IMetricSpecifiocationKind[] = [
        {name: 'Kolmogorov-Smirnov', className: 'KSMetricSpec'},
        {name: 'Autoencoder',        className: 'AEMetricSpec'},
        {name: 'Image Autoencoder',  className: 'ImageAEMetricSpec'},
        {name: 'Random Forest',      className: 'RFMetricSpec'},
        {name: 'GAN',                className: 'GANMetricSpec'},
        {name: 'Latency',            className: 'LatencyMetricSpec'},
        {name: 'Counter',            className: 'CounterMetricSpec'},
        {name: 'Error Rate',         className: 'ErrorRateMetricSpec'},
    ];

    private modelVersion$: Observable<ModelVersion>;

    constructor(
        public fb: FormBuilder,
        public dialog: DialogService,
        public formsService: FormsService,
        public mdlSnackbarService: MdlSnackbarService,
        public store: Store<HydroServingState>
    ) {
        this.modelVersion$ = this.store.select(fromModels.getSelectedModelVersion);
        this.applications$ = this.store.select(fromApplications.getAllApplications);

        this.sources$ = this.modelVersion$.pipe(
            switchMap( modelVersion => of(this.getInputNames(modelVersion)))
        );
    }

    ngOnInit() {
        this.createForm();

        const kindChange = this.form.get('kind').valueChanges;
        const withHealthChange  = this.form.get('withHealth').valueChanges.pipe(
            startWith(true)
        );

        withHealthChange.pipe(
            withLatestFrom(kindChange),
            tap(([withHealth, kind]) => {
                switch (kind) {
                    case 'AEMetricSpec':
                    case 'ImageAEMetricSpec':
                    case 'RFMetricSpec':
                    case 'LatencyMetricSpec':
                        const config = this.form.get('config') as FormGroup;
                        if (withHealth) {
                            config.addControl('threshold', this.fb.control(''));
                        } else {
                            config.removeControl('threshold');
                        }
                        break;
                }
            })
        ).subscribe();

        kindChange.pipe(withLatestFrom(withHealthChange)).subscribe(([kind, withHealth]) => {
            switch (kind) {
                case 'ImageAEMetricSpec':
                  const xx: any = {
                    applicationName: this.fb.control('')
                  };
                  if (withHealth) {
                    xx.threshold = this.fb.control('');
                  }
                  this.form.setControl('config', this.fb.group(xx));
                  break;
                case 'AEMetricSpec':
                case 'RFMetricSpec':
                    const x: any = {
                        input: this.fb.control(''),
                        applicationName: this.fb.control(''),
                    };

                    if (withHealth) {
                        x.threshold = this.fb.control('');
                    }

                    this.form.setControl('config', this.fb.group(x));
                    break;
                case 'GANMetricSpec':
                    this.form.setControl('config', this.fb.group({
                        input: this.fb.control(''),
                        applicationName: this.fb.control(''),
                    }));
                    break;
                case 'ErrorRateMetricSpec':
                case 'LatencyMetricSpec':
                    const y: any = {
                        interval: this.fb.control(''),
                    };

                    if (withHealth) {
                        y.threshold = this.fb.control('');
                    }

                    this.form.setControl('config', this.fb.group(y));
                    break;
                case 'CounterMetricSpec':
                    this.form.setControl('config', this.fb.group({
                        interval: this.fb.control(''),
                    }));
                    break;
                case 'KSMetricSpec':
                    this.form.setControl('config', this.fb.group({
                        input: this.fb.control('', Validators.required),
                    }));
                    break;
            }
        });
    }

    getInputNames(modelVersion: IModelVersion): string[] {
        if (!modelVersion) {
             return [];
        }

        const getName = input => input.name;
        const signatures = modelVersion.modelContract.signatures;

        const res = signatures.reduce(
            (namesArray, signature) => {
                return [...namesArray, ...signature.inputs.map(getName)];
            },
            []
        );

        return res;
    }

    onSubmit() {
        if (this.form.invalid) { return; }

        combineLatest(this.modelVersion$)
            .pipe(
                take(1),
                tap(([modelVersion]) => {
                    const { withHealth, config, kind } = this.form.value;

                    const metricSpecificationRequest: IMetricSpecificationRequest = {
                        name: this.form.value.name,
                        modelVersionId: modelVersion.id,
                        config,
                        withHealth,
                        kind,
                    };

                    console.log('%c Will send: ', 'color: blue');
                    console.dir(metricSpecificationRequest);

                    this.store.dispatch(new HydroActions.AddMetricAction(metricSpecificationRequest));
                    this.onClose();
                })
            ).subscribe();
    }

    ngOnDestroy() {
        if (this.applicationSub) {
            this.applicationSub.unsubscribe();
        }
    }

    public onClose(): void {
        this.dialog.closeDialog();
    }

    private createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            withHealth: { value: true, disabled: false },
            config: this.fb.group({}),
            kind: ['', Validators.required],
        });
    }
}
