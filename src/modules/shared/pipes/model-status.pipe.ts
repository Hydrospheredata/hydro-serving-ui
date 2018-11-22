import { Pipe, PipeTransform } from '@angular/core';
import { Model } from '@shared/models/_index';

@Pipe({
    name: 'modelStatus',
    })
export class ModelStatusPipe implements PipeTransform {

    transform(model: Model): any {
        const modelStatuses = {
            deployed: 'DEPLOYED',
            created: 'CREATED',
            stopped: 'STOPPED',
            failed: 'FAILED',
        };
        const status = modelStatuses.created;
        console.log(model);

        return status;
    }

}
