export interface MetricSpecificationConfig {
  input?: string;
  threshold?: number;
  interval?: number;
  applicationName?: string;
  thresholdCmpOperator?: {kind: string};
}
