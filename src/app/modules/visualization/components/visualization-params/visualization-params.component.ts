import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CustomValidatorsService } from '@app/core/custom-validators.service';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import {
  VisualizationParams,
  VisualizationPropertyMetric,
  VisualizationMetric,
} from '../../models';

@Component({
  selector: 'hs-visualization-params',
  templateUrl: './visualization-params.component.html',
  styleUrls: ['./visualization-params.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationParamsComponent implements OnInit {
  @Input() params: VisualizationParams;
  @Output() refit: EventEmitter<VisualizationParams> = new EventEmitter<
    VisualizationParams
  >();

  metrics: ReadonlyArray<VisualizationPropertyMetric> = [
    'euclidean',
    'manhattan',
    'chebyshev',
    'minkowski',
    'canberra',
    'braycurtis',
    'haversine',
    'mahalanobis',
    'wminkowski',
    'seuclidean',
    'cosine',
    'correlation',
    'hamming',
    'jaccard',
    'dice',
    'russellrao',
    'kulsinski',
    'rogerstanimoto',
    'sokalsneath',
    'sokalmichener',
    'yule',
  ];

  visualizationMetrics: ReadonlyArray<VisualizationMetric> = [
    'global_score',
    'sammon_error',
    'auc_score',
    'stability_score',
    'msid',
    'clustering',
  ];

  public form = this.fb.group({
    parameters: this.fb.group({
      metric: this.fb.control(this.metrics[0], [Validators.required]),
      min_dist: this.fb.control(0, [
        Validators.required,
        Validators.pattern(
          this.customValidators.VALIDATION_PATTERNS.floatNumber
        ),
      ]),
      n_components: this.fb.control(0, [
        Validators.required,
        Validators.pattern(this.customValidators.VALIDATION_PATTERNS.number),
      ]),
      n_neighbours: this.fb.control(0, [
        Validators.required,
        Validators.pattern(this.customValidators.VALIDATION_PATTERNS.number),
      ]),
    }),
    production_data_sample_size: this.fb.control(0, [
      Validators.required,
      Validators.pattern(this.customValidators.VALIDATION_PATTERNS.number),
    ]),
    training_data_sample_size: this.fb.control(0, [
      Validators.required,
      Validators.pattern(this.customValidators.VALIDATION_PATTERNS.number),
    ]),
    visualization_metrics: this.fb.control([], [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService
  ) {}

  ngOnInit() {
    this.updateParameters();

    this.form.controls['production_data_sample_size'].setValue(
      this.params.production_data_sample_size
    );
    this.form.controls['training_data_sample_size'].setValue(
      this.params.training_data_sample_size
    );
    (this.form.controls['visualization_metrics'] as FormArray).setValue(
      this.params.visualization_metrics
    );
  }

  private updateParameters() {
    this.form.controls['parameters'].setValue(this.params.parameters);
  }

  sendRequest() {
    if (this.form.valid) {
      this.refit.next(this.form.value);
    }
  }
}
