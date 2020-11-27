export interface AggregationDTO {
  _hs_first_id: string;
  _hs_last_id: string;
  _hs_model_version_id: number;
  _hs_requests: number;
  _hs_model_name: string;
  _id: string;
  _hs_metrics: {
    [metricName: string]: {
      checked: number;
      passed: number;
    };
  };
  _hs_batch: {
    [featureName: string]: {
      [metricName: string]: {
        checked: number;
        passed: number;
      };
    };
  };
}
