import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hydro-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

    private tableList: any[]; // ToDo: Fix any type
    @Input() tableHeader: string[];
    @Input() tableData: any;

    constructor() {}

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.tableData) {
            this.tableList = this.tableData;
        }
        console.log(this.tableList);
        // this.tableData.subscribe(items => {
        //     console.log(items);
        //     this.tableList = items;
        // });
    }

}
