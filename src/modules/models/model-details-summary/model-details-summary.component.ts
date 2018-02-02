import { Component, OnInit, Input } from '@angular/core';
import { Model } from '@shared/models/_index';



@Component({
    selector: 'hydro-model-details-summary',
    templateUrl: './model-details-summary.component.html',
    styleUrls: ['./model-details-summary.component.scss']
})
export class ModelDetailsSummaryComponent implements OnInit {

    @Input() model: Model;

    constructor() { }

    ngOnInit() {}

}
