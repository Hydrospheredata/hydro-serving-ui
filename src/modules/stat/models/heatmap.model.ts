export type HeatmapData = {
  x: string;
  y: string;
  value: number;
};

export interface HeatmapConfig {
  title?: string;
  yAxisName?: string;
  xAxisName?: string;
  xLabels: string[];
  yLabels: string[];
  data: Array<HeatmapData>;
}
