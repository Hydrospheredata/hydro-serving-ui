import { Injectable } from '@angular/core';
import { ColorsGeneratorFabric, ColorsGenerator } from './ColorGenerator';
import { ColoringType } from './ColoringType';

type ColorizerType = 'class_label' | 'metric';

export abstract class Colorizer {
  public type: string;
  public name: string;

  protected colorsGenerator: ColorsGenerator;
  protected data: number[];

  constructor(
    props: { name: string; data: number[] },
    colorsGenerator: ColorsGenerator
  ) {
    this.name = props.name;
    this.data = props.data;
    this.colorsGenerator = colorsGenerator;
  }
  public getColors(): string[] {
    return this.colorsGenerator.getColors(this.data);
  }
}

class ClassLabelColorizer extends Colorizer {
  constructor(
    props: { name: string; data: number[] },
    colorsGenerator: ColorsGenerator
  ) {
    super(props, colorsGenerator);
    this.type = 'ClassLabel';
  }
  getColors() {
    return this.colorsGenerator.getColors(this.data);
  }
}
class MetricColorizer extends Colorizer {
  constructor(props: { name: string; data: number[] }, colorsGenerator) {
    super(props, colorsGenerator);
    this.type = 'Metric';
  }
  getColors() {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class  ColorizerFabric {
  constructor(private colorGeneratorFabric: ColorsGeneratorFabric) {}
  public createColorizer(
    type: ColorizerType,
    props: { name: string, data: number[], coloring_type: ColoringType }
  ): Colorizer | null {
    const colorGenerator = this.colorGeneratorFabric.createColorGenerator(
      type,
      props.coloring_type,
      {}
    );

    switch (type) {
      case 'class_label':
        return new ClassLabelColorizer(props, colorGenerator);
      case 'metric':
        return new MetricColorizer(props, colorGenerator);
      default:
        return null;
    }
  }
}
