import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
    name: 'iterateAsArray',
    pure: false 
    })
export class IterateAsArrayPipe implements PipeTransform {
    transform(value: any): any {
        return Object.keys(value);
    }
}