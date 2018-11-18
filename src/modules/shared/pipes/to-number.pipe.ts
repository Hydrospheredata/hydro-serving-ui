import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toNumber',
})
export class ToNumberPipe implements PipeTransform {
    transform(str: string) {
        return Number(str);
    }
}
