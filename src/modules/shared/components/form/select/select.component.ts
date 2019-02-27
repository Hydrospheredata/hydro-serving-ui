import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hydro-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class HydroSelectComponent {

    @Input() items: any[];

    @Output() selectHandle: EventEmitter<any>;

    constructor() {
        this.selectHandle = new EventEmitter();
    }

    selectItem(value) {
        this.selectHandle.emit(value);
    }
}
