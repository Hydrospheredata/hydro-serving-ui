export interface SonarMetricData {
  name: string;
  value: number;
  labels: {
    columnIndex: string;
    modelVersionId: string;
    trace?: any;
    traces?: Array<{ uid: number; timestamp: number }>;
  };
  timestamp: number;
  health: any;
}

export type SonarResponse = SonarMetricData[];
