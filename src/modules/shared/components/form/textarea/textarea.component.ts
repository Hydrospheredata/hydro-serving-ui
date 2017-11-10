import {Component, Input, OnInit, forwardRef, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

const noop = (_?: any) => {};

@Component({
    selector: 'hydro-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        }
    ]
})
export class TextareaComponent implements ControlValueAccessor  {
    protected _value: any;
    protected onChange: (_: any) => void = noop;
    protected onTouched: () => void = noop;

    @Input() public label: string;
    @Input() public name: string;
    @Input() public formErrors: string;
    @Input() public disabled: string;
    @Input() public readonly: string;

    @Input() public placeholder: string;
    @Input() public errors: any;

    constructor() {}

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChange(value);
        }
    }

    public writeValue(value: any) {
        if (value !== this._value) {
            this._value = value;
        }
    }

    public registerOnChange(fn: (_: any) => void) {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    public hasErrors(textarea: NgModel): boolean {
        return textarea.touched && this.errors != null;
    }

}
