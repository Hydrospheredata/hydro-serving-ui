import { Injectable } from '@angular/core';
import { ColorsGeneratorFabric, ColorsGenerator } from './ColorGenerator';
import { ColoringType } from './ColoringType';

type ColorizerType = 'class_label' | 'metric';
interface ColorizerProps {
  name: string;
  data: number[];
  coloringType: ColoringType;
  classes?: Array<string | number>;
}
export abstract class Colorizer {
  public type: string;
  public name: string;
  public coloringType: ColoringType;
  protected colorsGenerator: ColorsGenerator;
  protected data: number[];

  constructor(props: ColorizerProps, colorsGenerator: ColorsGenerator) {
    this.name = props.name;
    this.data = props.data;
    this.coloringType = props.coloringType;
    this.colorsGenerator = colorsGenerator;
  }
  public getColors(): string[] {
    return this.colorsGenerator.getColors(this.data);
  }
}

class ClassLabelColorizer extends Colorizer {
  private classes: Array<string | number>;
  constructor(props: ColorizerProps, colorsGenerator: ColorsGenerator) {
    super(props, colorsGenerator);
    this.type = 'ClassLabel';
    this.classes = props.classes || [];
  }
  getColors() {
    return this.colorsGenerator.getColors(this.data);
  }
}
class MetricColorizer extends Colorizer {
  constructor(props: ColorizerProps, colorsGenerator) {
    super(props, colorsGenerator);
    this.type = 'Metric';
  }

  getColors() {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class ColorizerFabric {
  constructor(private colorGeneratorFabric: ColorsGeneratorFabric) {}
  public createColorizer(
    type: ColorizerType,
    props: ColorizerProps
  ): Colorizer | null {
    const colorGenerator = this.colorGeneratorFabric.createColorGenerator(
      type,
      props
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
