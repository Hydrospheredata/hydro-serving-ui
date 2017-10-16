import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDublicates'
})
export class RemoveDublicatesPipe implements PipeTransform {

  transform(items: any[], property?: string): any {
      console.log(items);
    // if (!items || !property) return items;
    return items.filter((item, index, self) => {
        return self.findIndex(t => { return t.modelRuntime.modelId === item.modelRuntime.modelId}) === index;
    });
    // return items.sort((leftItem: any, rightItem: any): number => {
    //   if (leftItem[property] > rightItem[property]) { return 1; }
    //   if (leftItem[property] < rightItem[property]) { return -1; }
    //   return 0;
    // });
  }
}
