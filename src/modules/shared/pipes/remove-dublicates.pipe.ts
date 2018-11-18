import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeDublicates',
    })
export class RemoveDublicatesPipe implements PipeTransform {

    transform(items: any[]): any {
        return items.filter((item, index, self) => {
            return self.findIndex(t => t.modelRuntime.modelId === item.modelRuntime.modelId) === index;
        });
    }
}
