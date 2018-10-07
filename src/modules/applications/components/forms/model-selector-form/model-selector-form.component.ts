import { Output, EventEmitter } from "@angular/core";

import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

import { Model } from '@shared/_index';
import { getAllModels } from '@models/reducers';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { HydroServingState } from '@core/reducers';
import * as fromModels from '@models/reducers'



@Component({
    selector: 'hydro-model-selector-form',
    templateUrl: './model-selector-form.component.html'
})
export class ModelSelectorFormComponent implements OnInit {
    @Input() group: FormGroup
    @Input() data;

    @Output() modelVersionChange = new EventEmitter();

    public models$: Observable<Model[]> = this.store.select(getAllModels);
    public modelVersions$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    public onModelVersionIdChange(modelVersionId){
        this.modelVersionChange.next(modelVersionId)
    }
    
    constructor(
        private store: Store<HydroServingState>
    ){}

    ngOnInit(){
        if(this.data){
            this.modelIdControl.setValue(this.data.modelId);

            this.getModelVersionsByModelId(this.data.modelId);
            this.modelVersionIdControl.setValue(this.data.modelVersionId);
            this.modelVersionChange.emit(this.data.modelVersionId);
        }

        this.subscribeToModelIdChange();
        this.subcribeToModelVersionIdChange();


    }

    public onModelIdChange(modelId): void {
        this.getModelVersionsByModelId(modelId);
        if(this.modelVersions$.getValue().length){
            this.modelVersionIdControl.setValue(this.modelVersions$.getValue()[0].id);
        }
    }

    private getModelVersionsByModelId(modelId){
        this.store.select(fromModels.getModelVersionsByModelId(modelId)).subscribe(
            modelVersions => {
                this.modelVersions$.next(modelVersions);
            }
        )
    }

    private get modelIdControl(): AbstractControl {
        return this.group.get('modelId');
    }

    private get modelVersionIdControl(): AbstractControl {
        return this.group.get('modelVersionId');
    }

    private subscribeToModelIdChange() {
        this.modelIdControl
            .valueChanges
            .subscribe(modelId => {
                this.onModelIdChange(modelId);
            });
    };
    private subcribeToModelVersionIdChange(){
        this.modelVersionIdControl
            .valueChanges
            .subscribe(modelVersionId => {
                this.onModelVersionIdChange(modelVersionId)
            });
    };
}