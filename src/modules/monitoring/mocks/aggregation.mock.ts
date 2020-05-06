import { Aggregation } from '@monitoring/models';

export function mockAggregationWithId(id): Aggregation {
  return {
    batchesChecks: {},
    featuresChecks: {},
    from: undefined,
    hs_requests: 0,
    id,
    metricsChecks: {},
    modelVersionId: 0,
    to: undefined,
  };
}
