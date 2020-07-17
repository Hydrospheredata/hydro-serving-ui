import { ColoringType } from '@core/models';
import { CmpOperators } from '@monitoring/models';

export type LinkRegime = 'all' | 'nearest' | 'counterfactuals';

export interface ClassLabel {
  classes?: Array<number | string>;
  coloring_type: ColoringType;
  data: number[];
}

export interface Metric {
  coloring_type: ColoringType;
  scores: number[];
  operation: CmpOperators;
  threshold: number;
}

export enum ETaskState {
  success = 'SUCCESS',
  pending = 'PENDING',
  failed = 'FAILED',
  unknown = 'UNKNOWN',
}

export interface TaskInformation {
  task_id: string;
  description?: string;
  message?: string;
  state: ETaskState;
  result: VisualizationResponse;
}

export interface VisualizationResponse {
  data_shape: [number, number];
  data: number[][];
  training_data_shape?: [number, number];
  training_data?: number[][];
  class_labels: {
    [name: string]: ClassLabel;
  };
  metrics: {
    [name: string]: Metric;
  };
  requests_ids: string[];
  top_N: number[][];
  counterfactuals: number[][];
  visualization_metrics: {
    [name: string]: string;
  };
  parametres?: any;
}
