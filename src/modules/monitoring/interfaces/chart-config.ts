interface Point {
  x: number,
  y: number,
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
  series: Array<Series>
  area?: boolean;
  threshold?: number;
}


export const mockChartConfig: ChartConfig = {
  size: {
    height: 150,
    width: 300,
    margins: {
      left: 40,
      right: 20,
      top: 10,
      bottom: 24,
    }
  },
  series: [],
  name: ''
}
