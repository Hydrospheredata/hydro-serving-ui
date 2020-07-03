export interface FeatureReportHistogram {
  bins: Array<number | string>;
  deployment: number[];
  training: number[];
}

export interface BivariateReport {
  drifted: boolean;
  feature_1: string;
  feature_2: string;
  production_heatmap: {
    density: number[][];
    x: string[];
    x_axis_name: string;
    y: string[];
    y_axis_name: string;
  };
  training_heatmap: {
    density: number[][];
    x: string[];
    x_axis_name: string;
    y: string[];
    y_axis_name: string;
  };
}

export interface FeatureReport {
  'drift-probability': number;
  histogram: FeatureReportHistogram;
  statistics: {
    [statisticName: string]: {
      change_probability?: number;
      deployment: number | string | string[] | number[];
      training: number | string | string[] | number[];
      message: string;
      has_changed: boolean;
    };
  };
  bivariate_reports?: BivariateReport[];
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
