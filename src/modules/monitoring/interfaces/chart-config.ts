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
  name: string;
  data?: {
    x: number[];
    y: number[];
  };
  area?: boolean;
  threshold?: number;
}
