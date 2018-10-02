import { Component, Input } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'application-stage',
    templateUrl: './application-stage.component.html',
    styleUrls: ['./application-stage.component.scss']
})
export class ApplicationStageComponent {
    @Input()
    applicationStagesFormArray: FormArray;

    addStageControl(){
        this.applicationStagesFormArray.push(this.buildStageControl());
    }

    private buildStageControl(): FormGroup {
        return this.fb.group({
            services: this.fb.array([])
        })
    }

    constructor(
        private fb: FormBuilder
    ){}

    public addServiceToStage(stage: FormGroup){
       let x = stage.get('services') as FormArray
       x.push(this.buildServiceGroup())
    }

    private buildModelGroup(){
        return this.fb.group({
            modelId: '',
            modelVersionId: ''
        })
    }

    private buildServiceGroup(): FormGroup{
        return this.fb.group({
            environment: '',
            model: this.buildModelGroup(),
            runtime: '',
            signatureName: '',
            weight: [0, Validators.required]
        })
    }
}