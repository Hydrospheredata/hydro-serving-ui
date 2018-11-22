import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'kafka-form',
    templateUrl: './kafka-form.component.html',
    styleUrls: ['./kafka-form.component.scss'],
})
export class KafkaFormComponent {
    @Input()
    public kafkaFormArray: FormArray;

    isKafkaEnabled: boolean = false;

    constructor(
        private fb: FormBuilder
    ) { }

    public addKafkaControl(): void {
        this.kafkaFormArray.push(this.buildKafkaSourceControl());
    }

    public removeKafkaControlAtIndex(index: number): void {
        this.kafkaFormArray.removeAt(index);

        if (this.kafkaFormArray.length === 0) {
            this.isKafkaEnabled = false;
        }
    }

    public toggleKafkaEnabled(event): void {
        this.isKafkaEnabled = event.target.checked;

        if (this.isKafkaEnabled) {
            this.addKafkaControl();
        } else {
            this.removeAllKafkaControls();
        }
    }

    private buildKafkaSourceControl(): FormGroup {
        return this.fb.group({
            sourceTopic: new FormControl(),
            destinationTopic: new FormControl(),
        });
    }

    private removeAllKafkaControls(): void {
        while (this.kafkaFormArray.length) {
            this.removeKafkaControlAtIndex(0);
        }
    }
}
