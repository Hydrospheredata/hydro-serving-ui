import { Component, Input } from "@angular/core";
import { FormArray } from "@angular/forms";



@Component({
    selector: 'services',
    templateUrl: './service.component.html'
})
export class ServiceComponent {
    @Input() servicesFormArray: FormArray
}