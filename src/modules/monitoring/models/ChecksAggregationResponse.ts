export interface AdditionalCheckInfo {
  _hs_first_id: string;
  _hs_last_id: string;
  _hs_model_version_id: number;
  _hs_requests: number;
  _hs_model_name: string;
  _id: string;
  _hs_metrics: {
    [metricName: string]: AggregationCheck;
  };
  _hs_batch: {
    [featureName: string]: {
      [metricName: string]: AggregationCheck;
    };
  };
}

interface AggregationCheck {
  checked: number;
  passed: number;
}

export interface Features {
  [featureName: string]: { checks: number; passed: number };
}
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

export type CheckAggregationResponseItem = Features & AdditionalCheckInfo;
export interface ChecksAggregationResponse {
  results: CheckAggregationResponseItem[];
  count: number;
  minDate: number;
  maxDate: number;
}
