export type VisualizationPropertyMetric =
  | 'euclidean'
  | 'manhattan'
  | 'chebyshev'
  | 'minkowski'
  | 'canberra'
  | 'braycurtis'
  | 'haversine'
  | 'mahalanobis'
  | 'wminkowski'
  | 'seuclidean'
  | 'cosine'
  | 'correlation'
  | 'hamming'
  | 'jaccard'
  | 'dice'
  | 'russellrao'
  | 'kulsinski'
  | 'rogerstanimoto'
  | 'sokalmichener'
  | 'sokalsneath'
  | 'yule';

export type VisualizationMetric =
  | 'global_score'
  | 'sammon_error'
  | 'auc_score'
  | 'stability_score'
  | 'msid'
  | 'clustering';

export interface VisualizationParams {
  parameters: {
    metric: VisualizationPropertyMetric;
    min_dist: number;
    n_components: number;
    n_neighbours: number;
  };
  production_data_sample_size: number;
  training_data_sample_size: number;
  visualization_metrics: VisualizationMetric[];
}
