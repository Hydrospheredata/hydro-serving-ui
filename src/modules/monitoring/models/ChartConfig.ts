interface Point {
  x: number;
  y: number;
}
interface Series {
  name: string;
  data: number[];
  color: string;
}
export interface ChartConfig {
  size: {
    width?: number;
    height?: number;
    margins?: {
      bottom?: number;
      left?: number;
      right?: number;
      top?: number;
    };
  };
  plotBands?: Array<{ from: number; to: number }>;
  name: string;
  data?: {
    [metricName: string]: {
      color?: string;
      x: number[];
      y: number[];
      threshold?: number;
    };
  };
  series: Series[];
  area?: boolean;
  threshold?: number;
}
