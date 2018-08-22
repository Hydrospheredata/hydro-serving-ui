import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Model, Application } from '@shared/models/_index';

@Component({
    selector: 'hydro-filter',
    templateUrl: './filter.component.html'
}) 
export class FilterComponent {
    @Input() data: Array<Model | Application>;
    @Input() filterProp: string = 'name';

    @Output() filter = new EventEmitter<Array<Application | Model>>();

    set searchStr(searchStr: string){
        const filtredItems = this.filterData(this.data, searchStr);
        this.filter.emit(filtredItems);
    }

    private filterData(items, searchStr): Array<Application | Model>{
        const reg = new RegExp(searchStr, 'i');
        return items.filter(item => reg.test(item[this.filterProp]));
    }
}