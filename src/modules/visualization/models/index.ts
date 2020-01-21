export interface Labels {
  ground_truth: number[];
  predicted: number[];
  confidences: number[];
  anomaly_label: number[];
  outlier_confidence: number[];
}
export interface VisualizationData {
  data_shape: [number, number];
  data: Array<[number, number]>;
  labels: Labels;
  top_100: number[][];
}
