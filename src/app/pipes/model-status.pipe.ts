import { Pipe, PipeTransform } from '@angular/core';
import { Model } from '@models/model';

@Pipe({
  name: 'modelStatus'
})
export class ModelStatusPipe implements PipeTransform {

  transform(model: Model, args?: any): any {
    let status = null;
    const modelStatuses = {
      deployed: 'DEPLOYED',
      created: 'CREATED',
      stopped: 'STOPPED'
    };

    if (model.currentServices && model.currentServices.length) {
      status = modelStatuses['deployed'];
    } else if (model.lastModelRuntime) {
      status = modelStatuses['stopped'];
    } else {
      status = modelStatuses['created'];
    }

    return status;
  }

}
