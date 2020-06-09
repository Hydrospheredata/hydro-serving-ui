// tslint:disable:variable-name
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

const noop = (_?: any) => {};

@Component({
  selector: 'hydro-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent implements ControlValueAccessor {
  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.onChange(value);
    }
  }

  @Input() public name: string;
  @Input() public label: string;
  @Input() public icon: string;
  @Input() public errors: { [err: string]: string } | null;
  @Input() public disabled: boolean;
  @Input() public placeholder: string;

  protected _value: any;
  protected onChange: (_: any) => void = noop;
  protected onTouched: () => void = noop;

  get inputClassMap(): { [p: string]: boolean } {
    const rootClass = 'hs-input__input';
    return {
      [rootClass]: true,
      [`${rootClass}--with-icon`]: this.icon !== undefined,
    };
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

  public hasErrors(input: NgModel): boolean {
    return input.touched && this.errors != null;
  }
}
