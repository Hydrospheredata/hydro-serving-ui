import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverseArray'
    })
export class ReverseArrayPipe implements PipeTransform {
    transform(items: any[]): any {
        return items.reverse();
    }
}