export interface GetChecksAggregationParams {
  modelVersionId: number;
  limit?: number;
  offset?: number;
}

export interface AdditionalCheckInfo {
  _hs_first_id: string;
  _hs_last_id: string;
  _hs_model_version_id: number;
  _hs_requests: number;
  _hs_model_name: string;
  _id: string;
  _hs_metrics: {
    [metricName: string]: { checks: number; passed: number };
  };
  _hs_batch: {
    [featureName: string]: {
      [metricName: string]: { checked: number; passed: number };
    };
  };
}

export interface Features {
  [featureName: string]: { checks: number; passed: number };
}

export type CheckAggregationItem = Features & AdditionalCheckInfo;

export interface ChecksAggregationResponse {
  results: CheckAggregationItem[];
  count: number;
}

export interface ChecksAggregation {
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
