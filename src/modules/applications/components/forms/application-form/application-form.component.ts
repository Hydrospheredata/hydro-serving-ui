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
import { ApplicationFormService } from '@applications/services/application-form.service';
import { ServiceFormService } from '@applications/services/service-form.service';

@Component({
    selector: 'hs-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.scss'],
    providers: [ ServiceFormService, ApplicationFormService ],
})
export class ApplicationFormComponent implements OnInit {
    @Output() submitHandle: EventEmitter<any> = new EventEmitter();
    @Input('data') data;

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
        this.applicationForm = this.formService.initForm(this.data);
    }

    public addStageControl() {
        this.formService.addStageControl();
    }

    public addServiceToStage(stage: FormGroup) {
        this.formService.addServiceToStage(stage);
    }

    public normalizeStageControlsValue() {
        return this.applicationForm.value.stages.map(stage => {
            return stage = {
                services: stage.services.map(service => ({
                        runtimeId: service.runtime,
                        modelVersionId: service.model.modelVersionId,
                        weight: Number(service.weight),
                        signatureName: service.signatureName,
                    })
                ),
            };
        });
    }

    public submit(): void {
        if (this.applicationForm.invalid) {
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

    public showRemoveServiceIcon(stage: FormControl): boolean {
        return stage.get('services').value.length > 1;
    }

    public onServiceDelete(stage: FormControl, serviceIdx: number): void {
        const services = stage.get('services') as FormArray;
        services.removeAt(serviceIdx);
    }
}
