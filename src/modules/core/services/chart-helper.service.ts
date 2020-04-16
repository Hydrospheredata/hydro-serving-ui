import { Injectable } from '@angular/core';
import { extent, scaleLinear } from 'd3';

@Injectable({
  providedIn: 'root',
})
export class ChartHelperService {
  scaleLinear() {
    return scaleLinear();
  }
  extent(x: number[]): [any, any] {
    return extent(x);
  }
}
