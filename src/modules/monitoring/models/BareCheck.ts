export interface BareCheck {
  _id: string;
  _hs_prediction_score: number;
  _hs_raw_checks: {
    overall: any[];
  };
  _hs_metric_checks: {
    [metricName: string]: any;
  };
  _hs_latency: number;
  _hs_error: string;
  _hs_score: number;
  _hs_overall_score: number;
  _hs_model_version_id: number;
}
