export interface FeatureReportHistogram {
  bins: Array<number | string>;
  deployment: number[];
  training: number[];
}

export interface FeatureReport {
  'drift-probability': number;
  histogram: FeatureReportHistogram;
  statistics: {
    [statisticName: string]: {
      change_probability?: number;
      deployment: number;
      training: number;
    };
  };
}

export interface Stat {
  overall_probability_drift: number;
  per_feature_report: {
    [featureName: string]: FeatureReport;
  };
  warnings: {
    final_decision: string;
    report: Array<{ drift_probability_per_feature: number; message: string }>;
  };
}
