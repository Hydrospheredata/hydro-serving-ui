import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input
} from '@angular/core';
import {
    FormArray,
    FormGroup,
    FormControl
} from '@angular/forms';

// providers
import { ApplicationFormService, StageFormData } from '@applications/services/application-form.service';
import { ModelVariantFormService } from '@applications/services/model-variant-form.service';
import { IApplication } from '@shared/_index';

@Component({
    selector: 'hs-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.scss'],
    providers: [ ModelVariantFormService, ApplicationFormService ],
})
export class ApplicationFormComponent implements OnInit {
    @Output() submitHandle: EventEmitter<any> = new EventEmitter();
    @Input() application: IApplication;

    public applicationForm: FormGroup;

    constructor(
        private formService: ApplicationFormService
    ) {}

    get applicationStagesFormArray() {
        return this.applicationForm.get('stages') as FormArray;
    }

    get kafkaFormArray() {
        return this.applicationForm.get('kafkaStreaming') as FormArray;
    }

    ngOnInit() {
        this.applicationForm = this.formService.initForm(this.application);
    }

    public addStageControl() {
        this.formService.addStageControl();
    }

    public addModelVariantToStage(stage: FormGroup) {
        this.formService.addModelVariantToStage(stage);
    }

    public normalizeStageControlsValue() {
        return this.applicationForm.value.stages.map((stage: StageFormData) => {
            return stage = {
                modelVariants: stage.modelVariants.map(modelVariant => ({
                        modelVersionId: modelVariant.modelVersionId,
                        weight: Number(modelVariant.weight),
                    })
                ),
            };
        });
    }

    public submit(): void {
        if (this.applicationForm.invalid) {
            this.applicationForm.get('applicationName').markAsDirty();
            return;
        }

        const formData = {
            name: this.applicationForm.value.applicationName,
            kafkaStreaming: this.kafkaFormArray.value || [],
            executionGraph: {
                stages: this.normalizeStageControlsValue(),
            },
        };

        this.submitHandle.emit(formData);
    }

    public showRemoveStageButton(): boolean {
       return  this.applicationStagesFormArray.value.length > 1;
    }

    public removeStage(stageIdx: number) {
        this.applicationStagesFormArray.removeAt(stageIdx);
    }

    public showRemoveModelVariantIcon(stage: FormControl): boolean {
        return stage.get('modelVariants').value.length > 1;
    }

    public onModelVariantDelete(stage: FormControl, modelVariantIdx: number): void {
        const modelVariants = stage.get('modelVariants') as FormArray;
        modelVariants.removeAt(modelVariantIdx);
    }
}
