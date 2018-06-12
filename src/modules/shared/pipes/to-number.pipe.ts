import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'toNumber'
})
export class ToNumberPipe implements PipeTransform {
    transform(string: string) {
        return Number(string);
    }
}