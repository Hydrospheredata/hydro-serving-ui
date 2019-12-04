import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Component,
  OnInit,
  InjectionToken,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorsService } from '@core/services/custom-validators.service';
import { ModelsFacade } from '@models/store';
import { MonitoringPageFacade } from '@monitoring/store/facades';
import { ModelVersion, Model } from '@shared/_index';
import {
  MetricSpecification,
  MetricSpecificationRequest,
} from '@shared/models/metric-specification.model';

export const metricSpec = new InjectionToken<MetricSpecification>(
  'metric spec id'
);

@Component({
  templateUrl: './dialog-metric.component.html',
  styleUrls: ['./dialog-metric.component.scss'],
})
export class DialogMetricComponent implements OnInit {
  @Input() modelVersion: ModelVersion;
  @Output() closed: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  models$: Observable<Model[]> = this.modelsFacade.allModels$;
  allModelVersions$: Observable<
    ModelVersion[]
  > = this.modelsFacade.allModelVersions$.pipe(
    map(mvs => mvs.filter(mv => !mv.isExternal))
  );
  modelVersions$: Observable<ModelVersion[]>;

  constructor(
    private fb: FormBuilder,

    private facade: MonitoringPageFacade,
    private modelsFacade: ModelsFacade,
    private customValidators: CustomValidatorsService
  ) {}
  ngOnInit() {
    this.createForm();

    const modelChange = this.form.get('config').get('model').valueChanges;
    modelChange.subscribe(_ => {
      console.log(_);
    });

    this.modelVersions$ = combineLatest(
      modelChange,
      this.allModelVersions$
    ).pipe(
      map(([model, modelVersions]) => {
        return modelVersions.filter(mv => mv.model.id === model.id);
      })
    );
  }

  geOutputNames(modelVersion: ModelVersion): string[] {
    if (!modelVersion) {
      return [];
    }

    const getName = output => output.name;
    const res = modelVersion.modelContract.predict.outputs.map(getName);
    console.log(res);
    return res;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const {
      config: { threshold, thresholdCmpOperator, modelVersionId },
      name,
    } = this.form.value;

    const params: MetricSpecificationRequest = {
      name,
      modelVersionId: this.modelVersion.id,
      config: {
        threshold: +threshold,
        thresholdCmpOperator,
        modelVersionId,
      },
    };

    this.facade.addMetric(params);
    this.onClose();
  }

  onClose() {
    this.closed.next();
  }

  private createForm() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.customValidators.metricNameFormat(),
        ],
      ],
      config: this.fb.group({
        threshold: this.fb.control('', [
          Validators.required,
          this.customValidators.pattern(
            this.customValidators.VALIDATION_PATTERNS.floatNumber
          ),
        ]),
        thresholdCmpOperator: this.fb.control(
          { kind: '' },
          Validators.required
        ),
        model: this.fb.control('', Validators.required),
        modelVersionId: this.fb.control('', Validators.required),
      }),
      kind: ['CustomModelMetricSpec', Validators.required],
    });
  }
}
