export interface ScatterPlotPoint {
  x: number;
  y: number;
  color?: string;
  translate?: string;
  opacity?: number;
}
export interface ScatterPlotData {
  points: ScatterPlotPoint[];
  visiblePoints?: ScatterPlotPoint[];
  opaquePoints?: ScatterPlotPoint[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
