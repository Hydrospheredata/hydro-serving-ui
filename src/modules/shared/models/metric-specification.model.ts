import { MetricSpecificationConfig } from '@shared/models/metric-specification-kind.model';

export interface IMetricSpecificationRequest {
  id?: string;
  name: string;
  modelVersionId: number;
  config: MetricSpecificationConfig;
  kind: string;
  withHealth?: boolean;
}

export interface IMetricSpecificationProvider {
  kind: string;
  byModelVersionId: {
    [modelVersionId: string]: MetricSpecification;
  };
  metrics: string[];
}

export interface IMetricSpecificationProviders {
  [metricSpecKind: string]: IMetricSpecificationProvider;
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
  public kind: MetricSpecificationKind;
  public withHealth: boolean;

  constructor(props: any = {}) {
    this.id = props.id;
    this.name = props.name;
    this.modelVersionId = props.modelVersionId;
    this.config = props.config;
    this.kind = props.kind;
    this.withHealth = props.withHealth;
  }
}
