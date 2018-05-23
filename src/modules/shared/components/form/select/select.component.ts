import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'hydro-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class HydroSelectComponent {

    @Input() items: any[];

    @Output() select: EventEmitter<any>;

    constructor() {
        this.select = new EventEmitter();
    }

    selectItem(value) {
        this.select.emit(value);
    }
}
