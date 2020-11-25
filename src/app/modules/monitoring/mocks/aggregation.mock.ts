import { Aggregation } from '../models';
import { MockModelVersion1Model1 } from '@testing/factories/modelVersion';

export function mockAggregationWithId(id): Aggregation {
  return {
    modelVersion: MockModelVersion1Model1,
    batchesChecks: {},
    featuresChecks: {},
    from: undefined,
    hs_requests: 0,
    id,
    metricsChecks: {},
    modelVersionId: 0,
    to: undefined,
    get inputFeaturesNames(): string[] {
      return [];
    },
    get outputFeaturesNames(): string[] {
      return [];
    },
  };
}
