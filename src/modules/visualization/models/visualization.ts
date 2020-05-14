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

export const mockVisualizationResult: VisualizationResponse = {
  data_shape: [10, 2],
  data: [
    [10.311838150024414, 7.109858512878418],
    [9.76542854309082, 7.289316654205322],
    [10.93822193145752, 6.5244059562683105],
    [7.938331604003906, 4.7838358879089355],
    [10.747235298156738, 6.297874450683594],
    [8.054553031921387, 8.244650840759277],
    [8.461652755737305, 4.751408576965332],
    [9.481518745422363, 7.981990337371826],
    [11.062357902526855, 7.0266337394714355],
    [8.847922325134277, 4.067715644836426],
  ],
  class_labels: {
    class: {
      classes: [0, 1],
      coloring_type: 'class',
      data: [1, 1, 1, 1, 0, 1, 0, 1, 0, 0],
    },
    confidence: {
      coloring_type: 'gradient',
      data: [
        0.47196451509596193,
        0.5190495596548069,
        0.9319467806068639,
        0.1880573169325348,
        0.5233253319370346,
        0.33912898312770146,
        0.4619729687497488,
        0.4203237837003968,
        0.09350085504054217,
        0.18695465496343522,
      ],
    },
  },
  metrics: {},
  requests_ids: [
    '7570',
    '12601',
    '3659',
    '2658',
    '15822',
    '2904',
    '7753',
    '13168',
    '69',
    '98',
  ],
  top_N: [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [7],
    [2, 3, 4, 5],
    [1],
  ],
  counterfactuals: [
    [2],
    [7, 3],
    [8, 9, 4],
    [0, 5],
    [1],
    [6, 7],
    [5, 7, 8],
    [3, 7],
    [2, 3, 4, 5],
    [1],
  ],
  visualization_metrics: {
    global_score: '0.992739467109571',
    msid: '335.7998896475878',
    sammon_error: '0.2808216485091878',
    stability: '0.03722758245284965',
  },
};

export const mockSuccessTask: TaskInformation = {
  result: mockVisualizationResult,
  state: ETaskState.success,
  task_id: 'b2ea3dd1-6d68-4d3f-a709-fd639ef2d7d6',
};
