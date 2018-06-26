import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromModels from '@models/reducers';



@Component({
    selector: 'hydro-models-wrapper',
    templateUrl: './models-wrapper.component.html',
    styleUrls: ['./models-wrapper.component.scss']
})
export class ModelsWrapperComponent implements OnInit {

    public sidebarTitle = 'Models';
    public models: any;


    constructor(
        private store: Store<fromModels.ModelsState>,
    ) { }

    ngOnInit() {
        this.models = this.store.select(fromModels.getAllModels);
    }

}
