import { Injectable } from '@angular/core';
type ColoringType = 'class' | 'gradient';
export class ColorsGenerator {
  getColors(data: number[]): string[] {
    return data.map(() => '#00498e');
  }
}

class GradientColorsGenerator extends ColorsGenerator {
  public getColors(data: number[]) {
    return data.map(val => {
      const [r, g, b] = [0, 0, 0];
      // const [r, g, b] = this.colorMapService.getRGB({
      //   val,
      //   type: 'redToBlue',
      // });
      return `rgb(${r}, ${g}, ${b})`;
    });
  }
}

class ClassLabelsColorsGenerator extends ColorsGenerator {
  private classes = [0, 1]; // TODO: change
  getColors(data: number[]) {
    const color = [
      '#418ecc',
      '#ff716c',
      '#ffad37',
      '#ddff64',
      '#85ff85',
      '#8cffd9',
      '#sef3ff',
      '#f59dfa',
      '#8a82ff',
      '#4362ff',
      '#6db7fa',
      '#b384f5',
      '#b366ac',
    ];
    return data.map(val => {
      return color[this.classes.indexOf(val)];
    });
  }
}

class MetricColorsGenerator implements ColorsGenerator {
  public getColors() {
    // const { scores, operation, threshold } = this.metric;
    const [successColor, failedColor] = ['#418ecc', '#ff716c'];
    // return scores.map(score => {
    //   switch (operation) {
    //     case 'Eq':
    //       return score === threshold ? successColor : failedColor;
    //     case 'NotEq':
    //       return score !== threshold ? successColor : failedColor;
    //     case 'Greater':
    //       return score > threshold ? successColor : failedColor;
    //     case 'Less':
    //       return score < threshold ? successColor : failedColor;
    //     case 'GreaterEq':
    //       return score >= threshold ? successColor : failedColor;
    //     case 'LessEq':
    //       return score <= threshold ? successColor : failedColor;
    //     default:
    //       return successColor;
    //   }
    // });
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class ColorsGeneratorFabric {
  public createColorGenerator(
    type: 'class_label' | 'metric',
    coloringType: ColoringType,
    props
  ): ColorsGenerator {
    switch (type) {
      case 'class_label':
        switch (coloringType) {
          case 'class':
            return new ClassLabelsColorsGenerator();
          case 'gradient':
            return new GradientColorsGenerator();
        }
      case 'metric':
        return new MetricColorsGenerator();
      default:
        return new ColorsGenerator();
    }
  }
}
