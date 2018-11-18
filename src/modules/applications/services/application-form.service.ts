import { Injectable } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import { ServiceFormService } from '@applications/services/service-form.service';
import { CustomValidatorsService } from '@core/services/custom-validators.service';

interface Service {
    weight: number;
    environment: any;
    runtime: any;
    modelVersion: any;
    signatureName: string;
}

interface Stage {
    services: Service[];
}

interface ExecutionGraph {
    stages: Stage[];
}

interface FormData {
    name?: string;
    executionGraph: ExecutionGraph;
}

@Injectable()
export class ApplicationFormService {
    private form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private serviceFormService: ServiceFormService,
        private customValidators: CustomValidatorsService
    ) {}

    public initForm(data: FormData = this.defaultFormData()): FormGroup {
        this.form = this.fb.group({
            applicationName: [
                data.name,
                [
                    this.customValidators.required(),
                    this.customValidators.uniqNameValidation(data.name),
                ],
            ],
            kafkaStreaming: this.fb.array([]),
            stages: this.fb.array(this.getStagesArray(data.executionGraph.stages)),
        });

        return this.form;
    }

    public get stages(): FormArray {
        return this.form.get('stages') as FormArray;
    }

    public addStageControl(stage = this.defaultStageData()): void {
        this.stages.push(this.buildStageGroup(stage));
    }

    public addServiceToStage(stageControl: FormGroup): void {
        const services = stageControl.get('services') as FormArray;
        services.push(this.serviceFormService.buildServiceFormGroup());
    }

    private buildStageGroup(stage): FormGroup {
        const services = stage.services.map(
            (service: Service) => this.serviceFormService.buildServiceFormGroup(service)
        );

        return this.fb.group({
            services: this.fb.array(services, this.customValidators.weightValidation()),
        });
    }

    private getStagesArray(stages: any[] = []): FormGroup[] {
        return stages.map(stage => this.buildStageGroup(stage));
    }

    private defaultStageData(): Stage {
        return {
            services: [
                this.serviceFormService.defaultService(),
            ],
        };
    }

    private defaultFormData(): FormData {
        return {
            name: '',
            executionGraph: {
                stages: [this.defaultStageData()],
            },
        };
    }
}
