import { ColoringType } from './ColoringType';

export interface ScatterPlotLegendConfig {
  coloringType: ColoringType;
  classes?: any[];
  range?: [number, number];
}
