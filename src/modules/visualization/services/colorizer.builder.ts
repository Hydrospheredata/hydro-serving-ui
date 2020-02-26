import { Injectable } from '@angular/core';
import { Colorizer, LabelTypes } from '@core/models';
import {
  ColorMapService,
  ColorMapType,
} from '@core/services/color-map.service';
class DefaultColorizer implements Colorizer {
  color(value: number) {
    return '#38BEC9';
  }
}
class TwoColorsColorizer implements Colorizer {
  color(value: number) {
    return value ? '#27AB83' : '#E12D39';
  }
}

class GradientColorizer implements Colorizer {
  constructor(private colorMapService: ColorMapService) {}
  color(val: number) {
    const [r, g, b] = this.colorMapService.getRGB({
      val,
      type: 'redToBlue',
    });

    return `rgb(${r}, ${g}, ${b})`;
  }
}

@Injectable({ providedIn: 'root' })
export class ColorizerBuilder {
  constructor(private colorMap: ColorMapService) {}
  build(type?: LabelTypes): Colorizer {
    switch (type) {
      case 'ground_truth':
      case 'predicted':
      case 'anomaly_label':
        return new TwoColorsColorizer();
      case 'confidences':
      case 'outlier_confidence': {
        return new GradientColorizer(this.colorMap);
      }
      default:
        return new DefaultColorizer();
    }
  }
}
