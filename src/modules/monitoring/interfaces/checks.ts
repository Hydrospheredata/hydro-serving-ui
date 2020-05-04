export interface BareCheck {
  _id: string;
  _hs_prediction_score: number;
  _hs_raw_checks: {
    overall: RawCheck[];
  };
  _hs_metric_checks: {
    [metricName: string]: MetricCheck;
  };
  _hs_latency: number;
  _hs_error: string;
  _hs_score: number;
  _hs_overall_score: number;
  _hs_model_version_id: number;
}
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

export interface CustomCheck {
  name: string;
  data: number[];
  health: number[];
  threshold: number;
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

export class CheckCollection {
  private checks: Check[];
  constructor(checks: Check[]) {
    this.checks = checks || [];
  }

  getChecks(): Check[] {
    return this.checks;
  }

  getLatency(): number[] {
    const getLatencyField = (check: Check) => check.latency;
    return this.checks.map(getLatencyField);
  }

  getErrorChecks(): Array<string | []> {
    const getErrorField = (check: Check) => check.error;
    return this.checks.map(getErrorField) || [];
  }

  getSummaryInformation(): {
    count: number;
    failed: number;
    success: number;
  } {
    const checks = this.checks;
    const count = checks.length;
    const success = checks.reduce((acc, check) => {
      if (check.overallScore === 1) {
        acc = acc + 1;
      }
      return acc;
    }, 0);
    return {
      count,
      success,
      failed: count - success,
    };
  }

  getFirstElement(): Check {
    return this.checks[0];
  }

  isEmpty(): boolean {
    return this.checks.length === 0;
  }
}
export const mockCheck: Check = new Check({
  _id: 'id',
  _hs_error: '',
  _hs_latency: 1,
  _hs_model_version_id: 2,
  _hs_overall_score: 0,
  _hs_prediction_score: 0,
  _hs_raw_checks: { overall: [] },
  _hs_metric_checks: {},
  _hs_score: 0,
});
export const mockEmptyCheckCollection: CheckCollection = new CheckCollection(
  []
);
export const mockCheckCollection: CheckCollection = new CheckCollection([
  mockCheck,
]);
