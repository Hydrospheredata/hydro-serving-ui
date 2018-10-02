import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';


//Components
import { ModelSelectorComponent } from '@app/components/dialogs/dialog-add-application.component/model-selector.component'
import { KafkaStreamingComponent } from '@app/components/dialogs/dialog-add-application.component/kafka-streaming.component'


@Component({
    selector: 'hydro-dialog-add-application',
    templateUrl: './dialog-add-application.component.html',
    entryComponents: [ModelSelectorComponent, KafkaStreamingComponent]
})
export class DialogAddApplicationComponent implements OnChanges, OnInit {
    public applicationForm: FormGroup;

    get applicationStagesFormArray(){
        return this.applicationForm.get('stages') as FormArray;
    }

    get kafkaFormArray(){
        return this.applicationForm.get('kafkaStreaming') as FormArray;
    }

    ngOnChanges(){
        console.log(1)
    }

    ngOnInit(){
        this.applicationForm = this.fb.group({
            applicationName: ['', Validators.required],
            kafkaStreaming: this.fb.array([]),
            stages: this.fb.array([])
        })
    }

    constructor(
        private fb: FormBuilder,
    ) {}
}

