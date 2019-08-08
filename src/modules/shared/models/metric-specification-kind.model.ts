export interface MetricSpecificationConfig {
  input?: string;
  threshold?: string;
  interval?: number;
  applicationName?: string;
  thresholdCmpOperator?: {kind: string};
}
