import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    Self,
} from '@angular/core';
import {
    FormGroup,
    FormControl
} from '@angular/forms';

import { HydroServingState } from '@core/reducers';
import { getAllModels } from '@models/reducers';
import { Store } from '@ngrx/store';

import { ModelVariantFormService } from '@applications/services';
import { Model, ModelVersion, ISignature } from '@shared/_index';

import { Observable, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
    selector: 'hs-model-variant-form',
    templateUrl: './model-variant-form.component.html',
    styleUrls: ['./model-variant-form.component.scss'],
    providers: [ModelVariantFormService],
})
export class ModelVariantFormComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() index: number;
    @Input() showRemoveIcon: boolean = false;

    @Output() delete = new EventEmitter();

    public data;
    public models$: Observable<Model[]> = this.store.select(getAllModels);
    public modelVersions$: Observable<any>;
    public selectedModelVersion$: Observable<ModelVersion>;

    get modelControl(): FormControl {
        return this.group.get('modelId') as FormControl;
    }

    get modelVersionControl(): FormControl {
        return this.group.get('modelVersionId') as FormControl;
    }

    get weightControl(): FormControl {
        return this.group.get('weight') as FormControl;
    }

    constructor(
        private store: Store<HydroServingState>,
        @Self() private modelVariantFormService: ModelVariantFormService
    ) {
        this.modelVersions$ = this.modelVariantFormService.getModelVersions();
        this.selectedModelVersion$ = this.modelVariantFormService.getCurrentModelVersion();
    }

    ngOnInit() {
        this.modelVariantFormService.updateModelVersionList(this.modelControl.value);

        this.modelVariantFormService.setCurrentModelVersion(this.modelVersionControl.value);
        this.subscribeToModelIdChange();
        this.subcribeToModelVersionIdChange();
    }

    public onModelIdChange(modelId): void {
        this.modelVariantFormService.updateModelVersionList(modelId);
        this.modelVersionControl.setValue(this.modelVariantFormService.getDefaultModelVersion().id);
    }

    public onModelVersionChange(modelVersionId: number): void {
        this.modelVariantFormService.setCurrentModelVersion(modelVersionId);
    }

    public onDelete(): void {
        this.delete.emit(this.index);
    }

    private subscribeToModelIdChange(): void {
        this.modelControl
            .valueChanges
            .subscribe(modelId => {
                this.onModelIdChange(modelId);
            });
    }

    private subcribeToModelVersionIdChange(): void {
        this.modelVersionControl
            .valueChanges
            .subscribe(modelVersionId => {
                this.onModelVersionChange(modelVersionId);
            });
    }
}
