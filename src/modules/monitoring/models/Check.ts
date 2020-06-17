import * as _ from 'lodash';
import { BareCheck } from './BareCheck';

export type CheckId = string;
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
  id: CheckId;
  error: string | null;
  latency: number;
  overallScore: number;
  metricChecks: { [metricName: string]: MetricCheck };
  rawChecks: {
    overall: RawCheck[];
  };
  modelVersionId: number;
  modelVersion: number;
  modelName: string;
  inputsOutputs: { [IOkey: string]: any };
  timestamp: number;

  constructor(params: BareCheck) {
    this.id = params._id;
    this.error = params._hs_error;
    this.latency = params._hs_latency;
    this.overallScore = params._hs_overall_score;
    this.metricChecks = params._hs_metric_checks || {};
    this.rawChecks = params._hs_raw_checks || { overall: [] };
    this.modelVersionId = params._hs_model_version_id;
    this.modelName = params._hs_model_name;
    this.modelVersion = params._hs_model_incremental_version;
    this.timestamp = params._hs_timestamp;
    this.inputsOutputs = this.getInputsOutputs(params);
  }

  isFailed(): boolean {
    return this.overallScore < 1;
  }

  hasMetricChecks(): boolean {
    return Object.keys(this.metricChecks).length > 0;
  }

  private getInputsOutputs(bareCheck: BareCheck) {
    const res = Object.create(null);

    for (const fieldName in bareCheck) {
      if (bareCheck.hasOwnProperty(fieldName) && !fieldName.startsWith('_')) {
        res[fieldName] = bareCheck[fieldName];
      }
    }

    return res;
  }

  getMetricsScore(): number {
    if (this.hasMetricChecks()) {
      const metricChecksArray = Object.values(this.metricChecks);
      const count = metricChecksArray.length;

      const successChecksCount = metricChecksArray.filter(({ check }) => check)
        .length;

      return successChecksCount / count;
    }
    return 0;
  }

  getRawScore(): number {
    const rawChecksArray = _.flatten(Object.values(this.rawChecks));
    const count = rawChecksArray.length;
    const successChecksCount = rawChecksArray.filter(({ check }) => check)
      .length;

    return successChecksCount / count;
  }
}
