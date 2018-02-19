import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'utcToLocal'
    })
export class UtcToLocalPipe implements PipeTransform {

    transform(value: any): any {
        return moment.utc(value).local();
    }

}
