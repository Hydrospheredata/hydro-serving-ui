export interface VisualizationRequest {}

export interface Colorizer {
  color: (value: number) => string;
}

export interface VisualizationResponse {
  data_shape: [number, number];
  data: number[][];
  class_labels: {
    [name: string]: number[];
  };
  metrics: {
    [name: string]: {
      operation: string;
      scores: Array<number | string>;
      threshold: number;
    };
  };
  request_ids: number[];
  top_100: number[][];
  visualization_metrics: {
    [name: string]: string;
  };
}
