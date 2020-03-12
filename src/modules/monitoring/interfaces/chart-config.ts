export interface ChartConfig {
  size: {
    width: number;
    height: number;
    margins?: {
      bottom?: number;
      left?: number;
      right?: number;
      top?: number;
    };
  };
  plotBands: Array<{ from: number; to: number }>;
  name: string;
  data?: {
    [metricName: string]: { color?: string; x: number[]; y: number[] };
  };
  area?: boolean;
  threshold?: number;
}
