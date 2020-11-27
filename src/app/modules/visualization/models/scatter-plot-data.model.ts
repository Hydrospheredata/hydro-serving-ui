export interface ScatterPlotPoint {
  x: number;
  y: number;
  color?: string;
  translate?: string;
  opacity?: number;
}
export interface ScatterPlotData {
  trainingPoints: ScatterPlotPoint[];
  points: ScatterPlotPoint[];
  visiblePoints?: ScatterPlotPoint[];
  opaquePoints?: ScatterPlotPoint[];
  minX: number | string;
  maxX: number | string;
  minY: number | string;
  maxY: number | string;
}
