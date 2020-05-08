import { BareCheck } from './BareCheck';

export interface MetricCheck {
  check: boolean;
  description: string;
  threshold: number;
  value: number;
  metricSpecId: string;
}
export interface RawCheck {
  check: boolean;
  description: string;
  threshold: number;
  value: number;
  metricSpecId: string;
}

export class Check {
  id: string;
  error: string | null;
  latency: number;
  overallScore: number;
  metricChecks: { [metricName: string]: MetricCheck };
  rawChecks: {
    overall: RawCheck[];
  };
  constructor(params: BareCheck) {
    this.id = params._id;
    this.error = params._hs_error;
    this.latency = params._hs_latency;
    this.overallScore = params._hs_overall_score;
    this.metricChecks = params._hs_metric_checks || {};
    this.rawChecks = params._hs_raw_checks || { overall: [] };
  }

  isFailed(): boolean {
    return this.overallScore < 1;
  }

  hasMetricChecks(): boolean {
    return Object.keys(this.metricChecks).length > 0;
  }
}
