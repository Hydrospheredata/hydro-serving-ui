import { MetricSpecification } from '@app/core/data/types';
import { Factory } from 'fishery';

export const MockMetricSpecification = Factory.define<MetricSpecification>(() => ({
  id: 'id',
  name: 'counter',
  config: {
    threshold: 0,
    thresholdCmpOperator: { kind: '' },
    modelVersionId: 1,
  },
  modelVersionId: 1,
}));
