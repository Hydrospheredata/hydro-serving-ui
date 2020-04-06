export interface ScatterPlotPoint {
  x: number;
  y: number;
  color?: string;
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
