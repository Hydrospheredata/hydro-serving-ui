import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'hydro-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

    @Input() tableHead: string[];
    @Input() data: any;

    constructor() {}

    ngOnInit() {
    }

    ngOnChanges() {
        console.log(this.data)
    }

}
