import { MetricSpecification } from '@shared/models/metric-specification.model';

export const MockMetricSpecification: MetricSpecification = {
  id: 'id',
  name: 'counter',
  config: {
    threshold: 0,
    thresholdCmpOperator: { kind: '' },
    modelVersionId: 1,
  },
  modelVersionId: 1,
};
