import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
    })
export class SearchPipe implements PipeTransform {

    transform(items: any[] = [], field: any, q: string): any {
        if (!items || !field || !q) return items;
        return items.filter((item) => {
            let result = false;
            if (item.model) {
                result = item.model[field].toLowerCase().indexOf(q.toLowerCase()) !== -1;    
            } else {
                result = item[field].toLowerCase().indexOf(q.toLowerCase()) !== -1;
            }
            return result;
        });
    }

}
