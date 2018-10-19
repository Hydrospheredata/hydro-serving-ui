import { 
    Component, 
    Input,
    Output,
    EventEmitter,
    OnInit,
    Self,
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

import { 
    getAllModels,
} from "@models/reducers";

import {
    EnvironmentsService
} from '@core/services/environments/_index';

import { 
    Observable, 
} from "rxjs";
import { ServiceFormService } from "@applications/services/service-form.service";

@Component({
    selector: 'hydro-service-form',
    templateUrl: './service-form.component.html',
    styleUrls: ['./service-form.component.scss'],
    providers: [EnvironmentsService, ServiceFormService]
})
export class ServiceFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() index: number;
    @Input() showRemoveIcon: boolean = false;

    @Output() delete = new EventEmitter();
    
    public data;
    public environments$: Observable<any> = this.envoirmentService.getEnvironments()
    public models$: Observable<Model[]> = this.store.select(getAllModels);
    public modelVersions$: Observable<any>;
    public runtimes$: Observable<Runtime[]>;

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
        private envoirmentService: EnvironmentsService,
        @Self() private serviceFormService: ServiceFormService
    ){
        this.runtimes$ = this.store.select('runtimes');
        this.modelVersions$ = this.serviceFormService.getModelVersions();
    }

    ngOnInit(){
        const modelData = this.group.get('model').value;
        this.serviceFormService.updateModelVersionList(modelData.modelId);

        this.subscribeToModelIdChange();
        this.subcribeToModelVersionIdChange();
    }

    public onModelIdChange(modelId): void {
        this.serviceFormService.updateModelVersionList(modelId);
        this.modelVersionIdControl.setValue(this.serviceFormService.getDefaultModelVersion().id);
    }

    public onModelVersionChange(modelVersionId): void {
        this.signatureName.patchValue(this.serviceFormService.getSignature(modelVersionId));
    }

    public onDelete(): void{
        this.delete.emit(this.index);
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