import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sidebarFilter',
  pure: false,
})
export class SidebarFilterPipe implements PipeTransform {
  transform(items: any, filterStatus: any): any {
    return items.filter(item => {
      let result = false;
      if (item.stages) {
        result = result || (filterStatus.apps && item.stages.length === 1);
        result = result || (filterStatus.pipelines && item.stages.length > 1);
      } else {
        result = result || (filterStatus.deployed && item.lastModelBuild);
        result = result || (filterStatus.undeployed && !item.lastModelBuild);
      }
      return result;
    });
  }
}
