import { ModelVersion } from '@app/core/data/types';
import { AggregationDTO } from './AggregationDTO';

export interface AggregationCheck {
  checked: number;
  passed: number;
}

export class Aggregation {
  readonly from: any;
  readonly to: any;
  readonly id: string;
  readonly hs_requests: number;
  readonly modelVersionId: number;
  readonly metricsChecks: { [metricName: string]: AggregationCheck };
  readonly batchesChecks: {
    [featureName: string]: {
      [metricName: string]: AggregationCheck;
    };
  };
  readonly featuresChecks: { [featureName: string]: AggregationCheck };
  readonly modelVersion: ModelVersion;

  constructor(params: AggregationDTO, modelVersion: ModelVersion) {
    this.id = params._id;
    this.hs_requests = params._hs_requests || 0;
    this.metricsChecks = params._hs_metrics || {};
    this.batchesChecks = params._hs_batch || {};
    this.featuresChecks = Aggregation.extractFeatureChecks(params);
    this.from = params._hs_first_id;
    this.to = params._hs_last_id;
    this.modelVersionId = params._hs_model_version_id;
    this.modelVersion = modelVersion;
  }

  private static extractFeatureChecks(params: any): {
    [featureName: string]: AggregationCheck;
  } {
    const featuresChecks = Object.create(null);

    for (const featureNameKey in params) {
      if (params.hasOwnProperty(featureNameKey)) {
        if (!featureNameKey.startsWith('_')) {
          const check: { checks: number; passed: number } =
            params[featureNameKey];
          featuresChecks[featureNameKey] = {
            checked: check.checks,
            passed: check.passed,
          };
        }
      }
    }

    return featuresChecks;
  }

  get inputFeaturesNames(): string[] {
    return this.modelVersion.contractInputs.map(input => input.name);
  }

  get outputFeaturesNames(): string[] {
    return this.modelVersion.contractOutputs.map(output => output.name);
  }
}
