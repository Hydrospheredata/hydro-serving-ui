import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'kafka-streaming',
    templateUrl: './kafka-streaming.component.html',
    styleUrls: ['./kafka-streaming.component.scss']
})
export class KafkaStreamingComponent implements OnInit{
    @Input()
    public kafkaFormArray: FormArray;

    isKafkaEnabled: boolean = false;
    
    public addKafkaControl(){
        this.kafkaFormArray.push(this.buildKafkaSourceControl());
    }

    public removeKafkaControlAtIndex(index: number): void {
        this.kafkaFormArray.removeAt(index);
        
        if(this.kafkaFormArray.length === 0){
            this.isKafkaEnabled = false;
        }
    }

    public toggleKafkaEnabled(event): void {
        this.isKafkaEnabled = event.target.checked;

        if(this.isKafkaEnabled){
            this.addKafkaControl();
        } else {
            this.removeAllKafkaControls();
        }
    }

    private buildKafkaSourceControl(): FormGroup {
        return this.fb.group({
            sourceTopic: new FormControl(),
            destinationTopic: new FormControl()
        })
    }

    private removeAllKafkaControls(): void {
        while(this.kafkaFormArray.length){
            this.removeKafkaControlAtIndex(0)
        }
    }

    constructor(
        private fb: FormBuilder
    ){
    }

    ngOnInit(){}
}