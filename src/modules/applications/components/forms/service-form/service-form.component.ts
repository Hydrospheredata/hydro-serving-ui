import { 
    Component, 
    Input,
    Output,
    EventEmitter
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

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
    @Input() index: number;
    @Input() showRemoveIcon: boolean = false;

    @Output() delete = new EventEmitter();
 
    public runtimes: Runtime[];
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

    private modelVersions;

    get model(): FormGroup {
        return this.group.get('model') as FormGroup
    }

    get signatureName(): FormControl {
        return this.group.get('signatureName') as FormControl
    }

    get weight(): FormControl{
        return this.group.get('weight') as FormControl
    }

    public onModelVersionChange(modelVersionId): void{
        this.signatureName.patchValue(this.getSignature(modelVersionId));
    }

    public onDelete(index): void{
        this.delete.emit(index);
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

    private getSignature(versionId): string {
        const model = this.modelVersions.find(version => version.id === versionId);
        return hocon(model.modelContract).signatures.signature_name;
    }
}