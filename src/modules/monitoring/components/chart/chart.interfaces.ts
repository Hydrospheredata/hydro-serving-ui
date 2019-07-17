import { SonarMetricData } from '@shared/_index';

export interface Bound {
  from: number;
  to: number;
}

export interface GroupedBounds {
  [uniqname: string]: Bound[];
}

export interface GroupedData {
  [uniqname: string]: SonarMetricData[];
}

export interface TooltipContent {
  timestamp: number;
  metrics: Array<{ name: string; value: number }>;
}

export interface ChartServiceData {
  mainData: { [uniqName: string]: SonarMetricData[] };
  comparedData: { [uniqName: string]: SonarMetricData[] };
  flattenData: SonarMetricData[];
}
