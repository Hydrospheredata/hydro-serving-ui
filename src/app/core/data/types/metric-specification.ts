import { Servable } from '../types/servable';

export interface MetricSpecificationConfig {
  threshold: number;
  modelVersionId: number;
  thresholdCmpOperator: { kind: string };
  servable?: Servable;
}
export interface MetricSpecificationRequest {
  name: string;
  modelVersionId: number;
  config: MetricSpecificationConfig;
}

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
