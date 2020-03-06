export interface ScatterPlotPoint {
  x: number;
  y: number;
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
