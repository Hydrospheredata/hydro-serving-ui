import { MetricSpecification } from '@shared/models/metric-specification.model';

export const MockMetricSpecification: MetricSpecification = {
    id: 'id',
    name: 'counter',
    kind: 'CounterMetricSpec',
    config: {},
    modelVersionId: 1,
    withHealth: true,
};
