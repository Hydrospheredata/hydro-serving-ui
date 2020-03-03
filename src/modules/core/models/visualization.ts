import { CmpOperators } from '@monitoring/models';

// TODO: use namespace ?

export interface VisualizationRequest {}

export interface Colorizer {
  getColors: () => string[];
}

export interface ClassLabel {
  classes?: Array<number | string>;
  coloring_type: ColoringType;
  data: number[];
}
export interface Metric {
  scores: number[];
  operation: CmpOperators;
  threshold: number;
}
export type ColoringType = 'class' | 'gradient';
export interface VisualizationResponse {
  data_shape: [number, number];
  data: number[][];
  class_labels: {
    [name: string]: ClassLabel;
  };
  metrics: {
    [name: string]: Metric;
  };
  request_ids: number[];
  top_100: number[][];
  visualization_metrics: {
    [name: string]: string;
  };
}
