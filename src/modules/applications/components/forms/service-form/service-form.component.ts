import { 
    Component, 
    Input,
    Output,
    EventEmitter,
    OnInit,
} from "@angular/core";
import {
    AbstractControl,
    FormGroup, 
    FormControl
} from "@angular/forms";

import { 
    Runtime, 
    Model 
} from '@shared/_index';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';

import * as hocon from 'hocon-parser';
import { 
    getAllModelVersions, 
    getAllModels,
    getModelVersionsByModelId
} from "@models/reducers";
import { of } from "rxjs/observable/of";
import { 
    Observable, 
    BehaviorSubject 
} from "rxjs";

@Component({
    selector: 'hydro-service-form',
    templateUrl: './service-form.component.html',
    styleUrls: ['./service-form.component.scss'],
})
export class ServiceFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() index: number;
    @Input() showRemoveIcon: boolean = false;

    @Output() delete = new EventEmitter();
    
    public data;
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
    ]);

    public models$: Observable<Model[]> = this.store.select(getAllModels);
    public modelVersions$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public runtimes: Runtime[];

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

    constructor(
        private store: Store<HydroServingState>,
    ){
        this.store.select(getAllModelVersions).subscribe(
            modelVersions => this.modelVersions = modelVersions
        );

        this.store.select('runtimes').subscribe(runtimes => {
            this.runtimes = runtimes;
        });
    }

    ngOnInit(){
        if(this.group.get('model').value){
            const modelData = this.group.get('model').value;
            this.getModelVersionsByModelId(modelData.modelId);
            this.modelIdControl.setValue(modelData.modelId);
            this.modelVersionIdControl.setValue(modelData.modelVersionId);
        }

        if(this.group.get('signatureName')){
            this.signatureNameControl.setValue(this.group.get('signatureName').value)
        }

        this.subscribeToModelIdChange();
        this.subcribeToModelVersionIdChange();
    }

    public onModelIdChange(modelId): void {
        this.getModelVersionsByModelId(modelId);
        const modelVersions = this.modelVersions$.getValue();

        if(modelVersions.length){
            this.modelVersionIdControl.setValue(modelVersions[modelVersions.length - 1].id);
        }
    }

    public onModelVersionChange(modelVersionId): void {
        this.signatureName.patchValue(this.getSignature(modelVersionId));
    }

    public onDelete(index): void{
        this.delete.emit(index);
    }



    private getModelVersionsByModelId(modelId){
        this.store.select(getModelVersionsByModelId(modelId)).take(1).subscribe(
            modelVersions => {
                this.modelVersions$.next(modelVersions);
            }
        )
    }

    private getSignature(versionId): string {
        const modelVersion = this.modelVersions.find(version => version.id === versionId);
        return hocon(modelVersion.modelContract).signatures.signature_name;
    }

    private get signatureNameControl(): AbstractControl {
        return this.group.get('signatureName');
    }

    private get modelIdControl(): AbstractControl {
        return this.group.get('model').get('modelId');
    }

    private get modelVersionIdControl(): AbstractControl {
        return this.group.get('model').get('modelVersionId');
    }

    private subscribeToModelIdChange() {
        this.modelIdControl
            .valueChanges
            .subscribe(modelId => {
                this.onModelIdChange(modelId);
            });
    }

    private subcribeToModelVersionIdChange(){
        this.modelVersionIdControl
            .valueChanges
            .subscribe(modelVersionId => {
                this.onModelVersionChange(modelVersionId)
            });
    }
}