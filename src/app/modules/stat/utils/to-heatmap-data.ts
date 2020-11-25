import { HeatmapData } from '../models';
import { flatMap, map } from 'lodash';

export function toHeatmapData(
  x: string[],
  y: string[],
  data: number[][]
): HeatmapData[] {
  return flatMap(y, (yVal, yIndex) =>
    map(x, (xVal, xIndex) => ({
      x: xVal,
      y: yVal,
      value: data[yIndex][xIndex],
    }))
  );
}
