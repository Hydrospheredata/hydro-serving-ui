import { Component, Input, AfterViewInit } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";

import { Model, ModelVersion } from '@shared/_index';
import { getAllModels } from '@models/reducers';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers'

@Component({
    selector: 'model-selector',
    templateUrl: './model-selector.component.html',
    styleUrls: ['./model-selector.component.scss']
})
export class ModelSelectorComponent implements AfterViewInit{
    @Input() 
    group: FormGroup;

    public models$: Observable<Model[]> = this.store.select(getAllModels);
    public modelVersions$ = new BehaviorSubject<ModelVersion[]>([]);

    ngAfterViewInit(): void {
        // CD error
        this.modelIdControl
            .valueChanges
            .subscribe(modelId => {
                this.onModelIdChange(modelId);
            });

        // this.modelIdControl.setValue(this.defaultModelId);
    }

    public onModelIdChange(modelId): void{
        this.store.select(fromModels.getModelVersionsByModelId(modelId)).subscribe(
            modelVersions => {
                this.modelVersions$.next(modelVersions);
                this.modelVersionIdControl.setValue(modelVersions[0].id);
            }
        )
    }

    //TODO: refactor
    // private get defaultModelId(): number{
    //     return 1;
    // }

    private get modelIdControl(): AbstractControl {
        return this.group.controls['modelId'];
    }

    private get modelVersionIdControl(): AbstractControl {
        return this.group.controls['modelVersionId'];
    }

    constructor(
        private store: Store<HydroServingState>
    ){}
}