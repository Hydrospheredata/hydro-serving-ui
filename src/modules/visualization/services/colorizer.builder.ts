import { Injectable } from '@angular/core';
import { Colorizer, ColoringType, ClassLabel, Metric } from '@core/models';
import {
  ColorMapService,
} from '@core/services/color-map.service';
import { switchMap } from 'rxjs/operators';
class DefaultColorizer implements Colorizer {
  constructor(private classLabel: ClassLabel) {}
  public getColors() {
    return this.classLabel.data.map(() => '#00498e');
  }
}

class GradientColorizer implements Colorizer {
  constructor(
    private classLabel: ClassLabel,
    private colorMapService: ColorMapService
  ) {}

  public getColors() {
    return this.classLabel.data.map(val => {
      const [r, g, b] = this.colorMapService.getRGB({
        val,
        type: 'redToBlue',
      });
      return `rgb(${r}, ${g}, ${b})`;
    });
  }
}
class ClassColorizer implements Colorizer {
  constructor(private classLabel: ClassLabel) {}
  public getColors() {
    const color = ['red', 'blue'];
    console.log(this.classLabel);
    return this.classLabel.data.map(val => {
      const classIndex = this.classLabel.classes.indexOf(val);

      return color[classIndex];
    });
  }
}
class MetricColorizer implements Colorizer {
  constructor(private metric: Metric) {}
  public getColors() {
    const { scores, operation, threshold } = this.metric;
    const [successColor, failedColor] = ['green', 'red'];
    return scores.map(score => {
      switch (operation) {
        case 'Eq':
          return score === threshold ? successColor : failedColor;
        case 'NotEq':
          return score !== threshold ? successColor : failedColor;
        case 'Greater':
          return score > threshold ? successColor : failedColor;
        case 'Less':
          return score < threshold ? successColor : failedColor;
        case 'GreaterEq':
          return score >= threshold ? successColor : failedColor;
        case 'LessEq':
          return score <= threshold ? successColor : failedColor;
        default:
          return successColor;
      }
    });
  }
}

// TODO: refactor build
@Injectable({ providedIn: 'root' })
export class ColorizerBuilder {
  constructor(private colorMap: ColorMapService) {}
  build(classLabel: ClassLabel): Colorizer {
    switch (classLabel.coloring_type) {
      case 'gradient':
        return new GradientColorizer(classLabel, new ColorMapService());
      case 'class':
        return new ClassColorizer(classLabel);
      default:
        return new DefaultColorizer(classLabel);
    }
  }
  buildMetricColorizer(metric: Metric): Colorizer {
    return new MetricColorizer(metric);
  }
}
