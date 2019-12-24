export interface Check {
  _id: string;
  _hs_prediction_score: number;
  _hs_raw_checks: {
    overall: RawCheck[];
  };
  _hs_metric_checks: {
    [metricName: string]: RawCheck;
  };
  _hs_latency: number;
  _hs_error: number;
  _hs_score: number;
  _hs_overall_score: number;
  _hs_model_version_id: number;
}

export interface RawCheck {
  check: boolean;
  description: string;
  threshold: number;
  value: number;
  metricSpecId: string;
}

export interface CustomCheck {
  name: string;
  data: number[];
  health: number[];
  threshold: number;
}
