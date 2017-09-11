import { Component, OnInit, OnChanges } from '@angular/core';

import { 
    WeightedServiceStore 
} from '@shared/_index';

import { WeightedService } from '@models/weighted-service';

@Component({
  selector: 'hydro-services-wrapper',
  templateUrl: './services-wrapper.component.html',
  styleUrls: ['./services-wrapper.component.scss']
})
export class ServicesWrapperComponent implements OnInit, OnChanges {
    
    public weightedServices: WeightedService[];

    constructor(
        private weightedServiceStore: WeightedServiceStore
    ) { }

    ngOnInit() {
        this.weightedServiceStore.getAll();
        this.weightedServiceStore.items
            .subscribe((items) => {
                this.weightedServices = items;
            });
    }

    ngOnChanges() {
        console.log("changes");
    }

}
