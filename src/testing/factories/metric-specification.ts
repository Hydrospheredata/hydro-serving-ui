import { MetricSpecification } from '@app/core/data/types';

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
