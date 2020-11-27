import {
  Component,
  EventEmitter,
  InjectionToken,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomValidatorsService } from '@app/core/custom-validators.service';
import {
  Model,
  ModelVersion,
  MetricSpecification,
  MetricSpecificationRequest,
} from '@app/core/data/types';
import { ModelVersionsFacade } from '@app/core/facades/model-versions.facade';
import { ModelsFacade } from '@app/core/facades/models.facade';

import { cmpOperators } from '../../../monitoring/models';
import { MetricsFacade } from '../../../monitoring/store/facades/metrics.facade';

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
  models$: Observable<Model[]> = this.modelsFacade.allModels();

  allModelVersions$: Observable<
    ModelVersion[]
  > = this.modelVersionsFacade
    .allModelVersions()
    .pipe(map(mvs => mvs.filter(mv => !mv.isExternal)));
  modelVersions$: Observable<ModelVersion[]>;

  constructor(
    private fb: FormBuilder,
    private modelsFacade: ModelsFacade,
    private modelVersionsFacade: ModelVersionsFacade,
    private customValidators: CustomValidatorsService,
    private metricsFacade: MetricsFacade
  ) {}
  ngOnInit() {
    this.createForm();

    const modelChange = this.form.get('config').get('model').valueChanges;
    modelChange.subscribe();

    this.modelVersions$ = combineLatest([
      modelChange,
      this.allModelVersions$,
    ]).pipe(
      map(([model, modelVersions]) => {
        return modelVersions.filter(mv => mv.model.id === model.id);
      })
    );
  }

  geOutputNames(modelVersion: ModelVersion): string[] {
    return modelVersion
      ? modelVersion.modelContract.predict.outputs.map(_ => _.name)
      : [];
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

    this.metricsFacade.addMetric(params);
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
          cmpOperators[0],
          Validators.required
        ),
        model: this.fb.control('', Validators.required),
        modelVersionId: this.fb.control('', Validators.required),
      }),
      kind: ['CustomModelMetricSpec', Validators.required],
    });
  }
}
