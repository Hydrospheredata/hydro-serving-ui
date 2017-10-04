import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(items: any[] = [], field: any, q: string): any {
        console.log(items, field, q);
        if (!items || !field || !q) return items;
        return items.filter((item) => {
            const result = item[field].toLowerCase().indexOf(q.toLowerCase()) !== -1;
            return result;
        });
    }

}
