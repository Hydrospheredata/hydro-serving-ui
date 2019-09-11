import { SonarMetricData } from '@shared/_index';
import { MetricSpecification } from '@shared/models/metric-specification.model';

export interface AggregationItem {
  meanValue: number | null;
  meanHealth: number | null;
  from: number;
  till: number;
  modelVersionId: number;
  minValue: null;
  maxValue: null;
}

export interface Aggregation {
  [metricSpecificationId: string]: AggregationItem;
}

export interface SonarData {
  [metricSpecId: string]: SonarMetricData[];
}

export interface Chart {
  feature: any;
  comparedModelVersionId: any;
}

export type ChartViewModel = Chart & {
  data: SonarMetricData[];
  comparedData: SonarMetricData[];
} & {
  metricSpecId: string;
} & { metricSpecification: MetricSpecification };

export interface Charts {
  [metricSpecId: string]: Chart;
}

export type ChartsViewModel = ChartViewModel[];

export interface ReqstoreEntry {
  uid: string;
  ts: string;
  request: any;
  response: any;
}

export interface ReqstoreLog {
  [id: string]: ReqstoreEntry[];
}

type LogEntry = ReqstoreEntry & {
  failed: boolean;
  metrics: {
    [metricKind: string]: {
      [columnIndex: string]: {
        [metricName: string]: any;
      };
    };
  };
};

export interface RequestResponseLog {
  [uid: string]: LogEntry[];
}

export interface ComparingChartParams {
  comparedModelVersionId: number;
  metricId: string;
  metricKind: string;
}
export interface GetChecksParams {
  modelVersionId: number;
  from: string;
  to: string;
}

export interface GetChecksAggreagationParams {
  modelVersionId: number;
  limit?: number;
  offset?: number;
}

interface AdditionalInfo {
  _hs_first_id: string;
  _hs_last_id: string;
  _hs_model_version_id: number;
  _hs_requests: number;
  _id: string;
}
export interface Feautures {
  [featureName: string]: { checks: number; passed: number };
}

export type ChecksAggregation = Feautures & AdditionalInfo;

export interface Check {
  _id: string;
  _hs_prediction_score: number;
  _hs_raw_checks: {
    overall: RawCheck[];
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
  threshold: number;
}

export interface ChartConfig {
  size: {
    width: number;
    height: number;
    margins?: {
      bottom?: number;
      left?: number;
      right?: number;
      top?: number;
    };
  };
  name: string;
  data?: {
    x: number[];
    y: number[];
  };
  threshold?: number;
}
