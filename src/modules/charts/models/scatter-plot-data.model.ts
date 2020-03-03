export interface ScatterPlotPoint {
  x: number;
  y: number;
}
export interface ScatterPlotData {
  points: ScatterPlotPoint[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
