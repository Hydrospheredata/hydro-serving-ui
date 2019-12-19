import { AdditionalCheckInfo } from './api';

export interface ChecksAggregationItem {
  features: {
    [featureName: string]: { checked: number; passed: number };
  };
  metrics: {
    [metricName: string]: { checked: number; passed: number };
  };
  additionalInfo: Partial<AdditionalCheckInfo>;
  batch: {
    [featureName: string]: {
      [metricName: string]: { checked: number; passed: number };
    };
  };
}
