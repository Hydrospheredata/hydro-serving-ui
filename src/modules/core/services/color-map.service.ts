import { Injectable } from '@angular/core';
import { RGBColor } from 'd3';
import * as d3 from 'd3';
import * as colorScaleChromatic from 'd3-scale-chromatic';
export type ColorMapType = 'coldwarm';

@Injectable({
  providedIn: 'root',
})
export class ColorMapService {
  getRGB({
    val,
    type,
  }: {
    val: number;
    type: ColorMapType;
  }): [number, number, number] {
    try {
      if (this.valueOutOfRange(val)) {
        throw Error('Value must be in [0, 1] range');
      }

      switch (type) {
        case 'coldwarm':
          return this.coldwarm(val);
        default:
          throw Error('Unknow colormap type');
      }
    } catch (error) {
      console.warn(error);
      return [0, 0, 0];
    }
  }

  private coldwarm(val): [number, number, number] {
    const {r, g, b} = d3.color(
      colorScaleChromatic.interpolatePuBu(val)
    ) as RGBColor;

    return [r, g, b];
  }

  private valueOutOfRange(val: number): boolean {
    return val < 0 || val > 1;
  }
}
