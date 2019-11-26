import { Servable } from '@servables/models';

export interface MetricSpecificationConfig {
  threshold: number;
  modelVersionId: number;
  thresholdCmpOperator: {kind: string};
  servable?: Servable;
}
