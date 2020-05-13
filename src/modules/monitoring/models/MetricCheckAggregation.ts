export interface MetricCheckAggregation {
  metricName: string;
  values: number[];
  threshold: any;
  checks: boolean[];
  modelVerId: number;
  modelName: string;
  modelVer: number;
}
