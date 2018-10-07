import { 
    ValidatorFn, 
    FormArray, 
    ValidationErrors, 
    FormControl
} from "@angular/forms";
import { Injectable } from "@angular/core";



@Injectable()
export class CustomValidatorsService {
    public weightValidation(): ValidatorFn {
        return (control: FormArray) : ValidationErrors => {
            const sum = control.controls.reduce((a, c) => a + Number(c.get('weight').value), 0)
            if(sum > 100) {
                return { 'weight': 'Sum of weights must be lower than 100'}
            }
        }
    }

    public uniqNameValidation(): ValidatorFn {
        return (control: FormControl) : ValidationErrors => {
            if(['1'].includes(control.value)) {
                return { 'uniq': 'Application name must be uniq'}
            }
        }
    }

    public pattern(pattern): ValidatorFn {
        return (control: FormControl) => {
            if(!pattern.test(control.value)){
                return {
                    pattern : 'It is not correct format.'
                }
            };
        }
    }

    public required(): ValidatorFn {
        return (control: FormControl) => {
            if(control.value === null || control.value === ''){
                return {
                    'required': 'Field is required'
                }
            }
        }
    }

    private _VALIDATION_PATTERNS = {
        text: /[a-zA-Z]+/,
        number: /^[0-9]+$/,
        textAndNumber: /[a-zA-Z0-9]+/,
        name: /[a-zA-Z_0-9-]+/,
    };

    private _MESSAGES = {
        ERRORS: {
            forms: {
                service: {
                    serviceName: {
                        'pattern': 'It is not correct format.',
                        'maxLength': 'Service name\' max length is 30.',
                        'required': 'Service name is required.'
                    },
                    serviceId: {
                        'pattern': 'Service id must be a number.',
                        'required': 'Service id is required.'
                    },
                    weight: {
                        'pattern': 'Weight must be a number.',
                        'required': 'Weight is required.'
                    },
                    weights: {
                        'overflow': 'Error. Sum of weights should be 100%.'
                    }
                }
            }
        }
    };

    constructor() { }

    get VALIDATION_PATTERNS() {
        return this._VALIDATION_PATTERNS;
    }

    get MESSAGES() {
        return this._MESSAGES;
    }
}