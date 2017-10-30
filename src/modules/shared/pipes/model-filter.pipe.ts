import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modelFilter',
  pure: false
})
export class ModelFilterPipe implements PipeTransform {

  transform(models: any, filterStatus: any): any {
    return models.filter(model => {
      let result = false;
      result = result || filterStatus['deployed'] && model.currentServices && model.currentServices.length > 0;
      result = result || filterStatus['undeployed'] && (!model.currentServices || model.currentServices.length < 1);
      return result;
    });
  }

}
