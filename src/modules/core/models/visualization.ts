export interface VisualizationRequest {}

export type LabelTypes =
  | 'ground_truth'
  | 'predicted'
  | 'confidences'
  | 'anomaly_label'
  | 'outlier_confidence';

export type Labels = {
  [P in keyof LabelTypes]?: number[];
};

export interface Colorizer {
  color: (value: number) => string;
}

export interface VisualizationResponse {
  data_shape: [number, number];
  data: Array<[number, number]>;
  labels: Labels;
  top_100: number[][];
}
