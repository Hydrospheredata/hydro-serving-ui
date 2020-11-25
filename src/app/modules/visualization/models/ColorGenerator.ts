import { Injectable } from '@angular/core';
import { Metric } from '@app/modules/visualization/models';
import { ColorMapService } from '@app/core/color-map.service';
import { ColoringType } from './ColoringType';

import { SCATTER_PLOT_PALETTE } from './ScatterPlotPalette';
export class ColorsGenerator {
  getColors(data: number[]): string[] {
    return data.map(() => '#00498e');
  }
}

@Injectable()
class GradientColorsGenerator extends ColorsGenerator {
  private colorMapService: ColorMapService;
  constructor() {
    super();
    this.colorMapService = new ColorMapService();
  }
  public getColors(data: number[]) {
    return data.map(val => {
      const [r, g, b] = this.colorMapService.getRGB({
        val,
        type: 'redToBlue',
      });
      return `rgb(${r}, ${g}, ${b})`;
    });
  }
}

class ClassLabelsColorsGenerator extends ColorsGenerator {
  private classes: Array<string | number>;
  constructor(classes: Array<string | number>) {
    super();
    this.classes = classes || [];
  }
  getColors(data: number[]) {
    return data.map(val => {
      return SCATTER_PLOT_PALETTE[this.classes.indexOf(val)];
    });
  }
}

class MetricColorsGenerator implements ColorsGenerator {
  metric: Metric;
  constructor(metric: Metric) {
    this.metric = metric;
  }
  public getColors(data: number[]) {
    const { scores, operation, threshold } = this.metric;
    const [successColor, failedColor] = ['#418ecc', '#ff716c'];
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
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class ColorsGeneratorFabric {
  public createColorGenerator(
    type: 'class_label' | 'metric',
    props: {
      coloringType?: ColoringType;
      classes?: Array<string | number>;
      metric?: Metric;
    }
  ): ColorsGenerator {
    switch (type) {
      case 'class_label':
        switch (props.coloringType) {
          case 'class':
            return new ClassLabelsColorsGenerator(props.classes);
          case 'gradient':
            return new GradientColorsGenerator();
        }
      case 'metric':
        return new MetricColorsGenerator(props.metric);
      default:
        return new ColorsGenerator();
    }
  }
}
