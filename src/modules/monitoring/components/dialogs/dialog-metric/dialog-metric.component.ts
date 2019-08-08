import { Observable, of } from 'rxjs';
import {
  switchMap,
  tap,
  startWith,
  filter,
  publish,
  refCount,
} from 'rxjs/operators';

import { Application } from '@shared/models/application.model';

import {
  Component,
  OnInit,
  InjectionToken,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';

import * as fromApplications from '@applications/reducers';
import * as HydroActions from '@core/actions/monitoring.actions';
import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers';
import { Store } from '@ngrx/store';

import { ModelVersion } from '@shared/_index';
import { MetricSpecificationConfig } from '@shared/models/metric-specification-kind.model';
import {
  IMetricSpecificationRequest,
  MetricSpecification,
  MetricSpecificationKind,
} from '@shared/models/metric-specification.model';

export const metricSpec = new InjectionToken<MetricSpecification>(
  'metric spec id'
);

interface IMetricSpecificationKind {
  name: string;
  className: string;
}

@Component({
  templateUrl: './dialog-metric.component.html',
  styleUrls: ['./dialog-metric.component.scss'],
})
export class DialogMetricComponent implements OnInit {
  @Input() metricSpecification: MetricSpecification;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  applications$: Observable<Application[]>;
  sources$: Observable<string[]>;
  actionName: string = 'Save';
  modelVersion: ModelVersion;

  metricSpecificationKinds: IMetricSpecificationKind[] = [
    { name: 'Kolmogorov-Smirnov', className: 'KSMetricSpec' },
    { name: 'Autoencoder', className: 'AEMetricSpec' },
    { name: 'Image Autoencoder', className: 'ImageAEMetricSpec' },
    { name: 'Random Forest', className: 'RFMetricSpec' },
    { name: 'GAN', className: 'GANMetricSpec' },
    { name: 'Latency', className: 'LatencyMetricSpec' },
    { name: 'Counter', className: 'CounterMetricSpec' },
    { name: 'Error Rate', className: 'ErrorRateMetricSpec' },
    { name: 'Prediction Accuracy', className: 'AccuracyMetricSpec' },
    { name: 'Custom Model', className: 'CustomModelMetricSpec' },
  ];

  private modelVersion$: Observable<ModelVersion>;

  constructor(
    private fb: FormBuilder,
    private store: Store<HydroServingState>
  ) {
    this.modelVersion$ = this.store
      .select(fromModels.getSelectedModelVersion)
      .pipe(
        filter(mv => !!mv),
        tap(modelVersion => (this.modelVersion = modelVersion)),
        publish(),
        refCount()
      );

    this.applications$ = this.store.select(fromApplications.getAllApplications);

    this.sources$ = this.modelVersion$.pipe(
      switchMap(modelVersion => of(this.getInputNames(modelVersion)))
    );

    this.setActionName();
  }

  ngOnInit() {
    this.createForm(this.metricSpecification);

    const kindChange = this.form.get('kind').valueChanges;
    const withHealthChange = this.form
      .get('withHealth')
      .valueChanges.pipe(startWith(true));

    withHealthChange.subscribe(() => this.withHealthChanged());
    kindChange.subscribe(() => this.kindChanged({}));
  }

  setActionName(): void {
    this.actionName = this.metricSpecification ? 'Edit' : 'Add';
  }

  withHealthChanged() {
    const withHealth: boolean = this.form.get('withHealth').value;
    const kind: MetricSpecificationKind = this.form.get('kind').value;

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
      case 'CustomModelMetricSpec':
        const cfg = this.form.get('config') as FormGroup;
        if (withHealth) {
          cfg.addControl('threshold', this.fb.control(''));
          cfg.addControl('thresholdCmpOperator', this.fb.control(''));
        } else {
          cfg.removeControl('threshold');
          cfg.removeControl('thresholdCmpOperator');
        }
        break;
    }
  }

  kindChanged(
    {
      applicationName,
      threshold,
      input,
      interval,
      thresholdCmpOperator,
    }: Partial<MetricSpecificationConfig> = {
      applicationName: '',
      threshold: '',
      input: '',
      interval: 1,
      thresholdCmpOperator: {kind: ''},
    }
  ) {
    const withHealth: boolean = this.form.get('withHealth').value;
    const kind: MetricSpecificationKind = this.form.get('kind').value;

    let controls: { [controlName: string]: AbstractControl };
    switch (kind) {
      case 'AccuracyMetricSpec':
        this.removeConfig();
        break;
      case 'ImageAEMetricSpec':
        controls = {
          applicationName: this.fb.control(applicationName),
        };
        if (withHealth) {
          controls.threshold = this.fb.control(threshold);
        }
        this.form.setControl('config', this.fb.group(controls));
        break;
      case 'AEMetricSpec':
      case 'RFMetricSpec':
        controls = {
          input: this.fb.control(input),
          applicationName: this.fb.control(applicationName),
        };

        if (withHealth) {
          controls.threshold = this.fb.control(threshold);
        }

        this.form.setControl('config', this.fb.group(controls));
        break;
      case 'GANMetricSpec':
        this.form.setControl(
          'config',
          this.fb.group({
            input: this.fb.control(input),
            applicationName: this.fb.control(applicationName),
          })
        );
        break;
      case 'ErrorRateMetricSpec':
      case 'LatencyMetricSpec':
        controls = {
          interval: this.fb.control(interval, [Validators.required]),
        };

        if (withHealth) {
          controls.threshold = this.fb.control(threshold);
        }

        this.form.setControl('config', this.fb.group(controls));
        break;
      case 'CounterMetricSpec':
        this.form.setControl(
          'config',
          this.fb.group({
            interval: this.fb.control(interval, [Validators.required]),
          })
        );
        break;
      case 'KSMetricSpec':
        this.form.setControl(
          'config',
          this.fb.group({
            input: this.fb.control(input, Validators.required),
          })
        );
        break;
      case 'CustomModelMetricSpec':
        controls = {
          applicationName: this.fb.control(applicationName),
        };

        if (withHealth) {
          controls.threshold = this.fb.control(threshold);
          controls.thresholdCmpOperator = this.fb.control(thresholdCmpOperator);
        }
        this.form.setControl('config', this.fb.group(controls));
    }
  }

  getInputNames(modelVersion: ModelVersion): string[] {
    if (!modelVersion) {
      return [];
    }

    const getName = input => input.name;
    const res = modelVersion.modelContract.predict.inputs.map(getName);

    return res;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { withHealth, config = {}, kind } = this.form.value;

    const params: IMetricSpecificationRequest = {
      name: this.form.value.name,
      modelVersionId: this.modelVersion.id,
      config,
      withHealth,
      kind,
    };

    if (this.metricSpecification) {
      params.id = this.metricSpecification.id;
      this.store.dispatch(new HydroActions.EditMetricAction(params));
    } else {
      this.store.dispatch(new HydroActions.AddMetricAction(params));
    }
    this.onClose();
  }

  onClose() {
    this.closed.next();
  }

  private createForm(metricSpecification?: Partial<MetricSpecification>) {
    const defaultMetricSpecification: Partial<MetricSpecification> = {
      name: '',
      withHealth: true,
      kind: 'CounterMetricSpec',
    };

    const newMetricSpec = metricSpecification || defaultMetricSpecification;
    const { name, withHealth, kind, config } = newMetricSpec;

    this.form = this.fb.group({
      name: [name || '', Validators.required],
      withHealth: { value: withHealth || true, disabled: false },
      config: this.fb.group({}),
      kind: [kind || '', Validators.required],
    });
    this.kindChanged(config);
  }

  private removeConfig(): void {
    this.form.removeControl('config');
  }
}
