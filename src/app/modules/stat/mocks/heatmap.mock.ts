import { HeatmapData, HeatmapConfig } from '../models';
import { toHeatmapData } from '../utils/to-heatmap-data';

const x = ['A', 'B', 'C', 'D'];
const y = ['X', 'Y', 'Z', 'W'];

const generateData = () => {
  return x.map(_ => y.map(() => Math.random()));
};
export const heatmapData: HeatmapData[] = toHeatmapData(x, y, generateData());
export const heatmapConfig: HeatmapConfig = {
  xLabels: x,
  yLabels: y,
  data: heatmapData,
};
