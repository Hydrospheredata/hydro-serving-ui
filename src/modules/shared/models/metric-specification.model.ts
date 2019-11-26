import { MetricSpecificationConfig } from '@shared/models/metric-specification-kind.model';

export interface MetricSpecificationRequest {
  name: string;
  modelVersionId: number;
  config: MetricSpecificationConfig;
}

export interface MetricSpecificationProvider {
  // kind: string;
  byModelVersionId: {
    [modelVersionId: string]: MetricSpecification;
  };
  metrics: string[];
}

export interface MetricSpecificationProviders {
  [metricSpecKind: string]: MetricSpecificationProvider;
}

export type MetricSpecificationKind =
  | 'CounterMetricSpec'
  | 'KSMetricSpec'
  | 'AEMetricSpec'
  | 'ImageAEMetricSpec'
  | 'RFMetricSpec'
  | 'GANMetricSpec'
  | 'LatencyMetricSpec'
  | 'ErrorRateMetricSpec'
  | 'AccuracyMetricSpec'
  | 'CustomModelMetricSpec';

export class MetricSpecification {
  public id: string;
  public name: string;
  public modelVersionId: number;
  public config: MetricSpecificationConfig;

  constructor(props: any = {}) {
    this.id = props.id;
    this.name = props.name;
    this.modelVersionId = props.modelVersionId;
    this.config = props.config;
  }
}
