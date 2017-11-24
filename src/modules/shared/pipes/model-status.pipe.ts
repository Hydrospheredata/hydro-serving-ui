import { Pipe, PipeTransform } from '@angular/core';
import { Model } from '@shared/models/_index';

@Pipe({
    name: 'modelStatus'
    })
export class ModelStatusPipe implements PipeTransform {

    transform(model: Model): any {
        const modelStatuses = {
            deployed: 'DEPLOYED',
            created: 'CREATED',
            stopped: 'STOPPED',
            failed: 'FAILED'
        };
        let status = modelStatuses['created'];

        if (model.currentServices && model.currentServices.length) {
            status = modelStatuses['deployed'];
        } else if (Object.keys(model.lastModelRuntime).length && model.lastModelBuild.status === 'FINISHED') {
            status = modelStatuses['stopped'];
        } else if (model.lastModelBuild.status === 'ERROR' || model.lastModelBuild.status === 'FAILED') {
            status = modelStatuses['failed'];
        }

        return status;
    }

}
