import { Component, OnInit, Input } from '@angular/core';
import { Model } from '@shared/_index';



@Component({
    selector: 'hydro-model-details-summary',
    templateUrl: './model-details-summary.component.html',
    styleUrls: ['./model-details-summary.component.scss']
    })
export class ModelDetailsSummaryComponent implements OnInit {

    @Input() model: Model;
    @Input() isDeployable: boolean;
    @Input() isModelService: boolean;
    @Input() version?: string;

    constructor() { }

    ngOnInit() {}

    public getLatestVersion() {
        return '0.0.1';
    }

}
