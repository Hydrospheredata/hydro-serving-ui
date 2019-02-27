import { Pipe, PipeTransform } from '@angular/core';
import { IShape } from '@shared/models/_index';

@Pipe({name: 'fieldShape'})
export class FieldShapePipe implements PipeTransform {
    transform(shape: IShape): string {
        if (shape === undefined) {
            return 'any shape';
        } else if (shape.dim && shape.dim.length === 0) {
            return 'scalar';
        } else if (shape.dim && shape.dim.length > 0) {
            return shape.dim.map(dim => dim.size).join(', ');
        }
    }
}
