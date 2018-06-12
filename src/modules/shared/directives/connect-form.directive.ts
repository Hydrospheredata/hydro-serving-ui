import { Directive, Input } from "@angular/core";
import { FormGroupDirective } from "@angular/forms";

@Directive({ selector: '[connectForm]' })
export class ConnectFormDirective {
    @Input('connectForm')
    set data(value: any) {
        console.log(value);
        console.log(this.formGroupDirective.form);
        if (value) {
            this.formGroupDirective.form.patchValue(value);
            this.formGroupDirective.form.markAsPristine();
        }
    }


    constructor(private formGroupDirective: FormGroupDirective) {

    }
}