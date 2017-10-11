import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
    name: 'iterateAsArray',
    pure: false 
})
export class IterateAsArrayPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)//.map(key => value[key]);
    }
}