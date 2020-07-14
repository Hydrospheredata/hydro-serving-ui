export interface VisualizationParams {
  parameters: {
    metric: any;
    min_dist: number;
    n_components: number;
    n_neighbours: number;
  };
  production_data_sample_size: number;
  training_data_sample_size: number;
  visualization_metrics: string[];
}
