import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, q: string): any {
    if (!items || !field || !q) return items;

    let result;
    const fieldsArr: string[] = field.split(' ');

    result = items.filter((item) => {
      if (item[ fieldsArr[0]]) {
        return item[ fieldsArr[0]].toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
          item[fieldsArr[1]].toLowerCase().indexOf(q.toLowerCase()) !== -1;
      }
    });

    return result;
  }

}
