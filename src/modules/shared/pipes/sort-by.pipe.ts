import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
    })
export class SortByPipe implements PipeTransform {

    transform(items: any[], property: string): any {
        if (!items || !property) return items;
        return items.sort((leftItem: any, rightItem: any): number => {
            if (leftItem[property] > rightItem[property]) { return 1; }
            if (leftItem[property] < rightItem[property]) { return -1; }
            return 0;
        });
    }
}
