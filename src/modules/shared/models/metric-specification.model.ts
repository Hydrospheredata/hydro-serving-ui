import { IMetricSpecificationKind } from '@shared/models/metric-specification-kind.model';

export interface IMetricSpecificationRequest {
  name: string;
  modelVersionId: number;
  config: IMetricSpecificationKind;
  kind: string;
  withHealth?: boolean;
}
export interface IMetricSpecification {
  id: string;
  name: string;
  modelVersionId: number;
  config: IMetricSpecificationKind;
  kind: string;
  withHealth?: boolean;
}

export interface IMetricSpecificationProvider {
  kind: string;
  byModelVersionId: {
      [modelVersionId: string]: IMetricSpecification;
  };
  metrics: string[];
}

export interface IMetricSpecificationProviders {
  [metricSpecKind: string]: IMetricSpecificationProvider;
}

export class MetricSpecification implements IMetricSpecification {
  public id: string;
  public name: string;
  public modelVersionId: number;
  public config: IMetricSpecificationKind;
  public kind: string;
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
