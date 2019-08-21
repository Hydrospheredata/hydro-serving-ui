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
  sonarData: SonarMetricData[];
  comparedSonarData: SonarMetricData[];
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
  [timestamp: string]: ReqstoreEntry[];
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
  [timestamp: string]: LogEntry[];
}
