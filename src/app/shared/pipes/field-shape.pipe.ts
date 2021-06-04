import { Pipe, PipeTransform } from '@angular/core';
import { Shape } from '@app/core/data/types';

@Pipe({ name: 'fieldShape' })
export class FieldShapePipe implements PipeTransform {
  transform(shape: Shape): string {
    if (shape === undefined) {
      return 'any shape';
    } else if (shape.dims && shape.dims.length === 0) {
      return 'scalar';
    } else if (shape.dims && shape.dims.length > 0) {
      return shape.dims.map(dim => dim.size).join(', ');
    }
  }
}
