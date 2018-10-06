import { 
    Component, 
    Input
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Runtime } from '@shared/_index';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';

import * as hocon from 'hocon-parser';
import { getAllModelVersions } from "@models/reducers";
import { of } from "rxjs/observable/of";

@Component({
    selector: 'hydro-service-form',
    templateUrl: './service-form.component.html',
    styleUrls: ['./service-form.component.scss'],
})
export class ServiceFormComponent {
    @Input() group: FormGroup;

    public runtimes: Runtime[];
    private modelVersions;

    public environments$ = of([
        {
            id: 0,
            name: 'CPU',
            placeholders: []
        },
        {
            id: 1,
            name: 'GPU',
            placeholders: []
        }
    ])

    get model(){
        return this.group.get('model')
    }

    get signatureName() {
        return this.group.get('signatureName')
    }

    private getSignature(versionId) {
        const model = this.modelVersions.find(version => version.id === versionId);
        return hocon(model.modelContract).signatures.signature_name;
    }

    public onModelVersionChange(modelVersionId){
        this.signatureName.patchValue(this.getSignature(modelVersionId));
    }
    

    constructor(
        private store: Store<HydroServingState>,
    ){
        this.store.select(getAllModelVersions).subscribe(
            modelVersions => this.modelVersions = modelVersions
        )

        this.store.select('runtimes')
            .subscribe(runtimes => {
                this.runtimes = runtimes;
            });
    }
}