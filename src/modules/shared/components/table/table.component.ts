import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ModelService, Service } from '@shared/models/_index';
import * as moment from 'moment';



@Component({
  selector: 'hydro-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

    private tableList: any[] = []; // ToDo: Fix any type
    private modelServices: ModelService[];
    private services: Service[];
    @Input() tableHeader: string[];
    @Input() tableData: any;
    @Input() isModels: boolean;

    constructor() {}

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.tableData) {
            this.tableList = this.tableData;
        }
    }

    getModelService(modelRuntimeId: number): ModelService {
        if (!this.modelServices) {
            return null;
        }
        return this.modelServices.find((modelService) => modelService.modelRuntime.id === modelRuntimeId);
    }

    getServices(modelRuntimeId: number): Service[] {
        const modelService = this.getModelService(modelRuntimeId);
        if (!modelRuntimeId || !modelService) {
            return [];
        }
        return this.services.filter((service) => {
            return service.weights.some((weight) => weight.serviceId === modelService.serviceId);
        });
    }

}
