import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable()
export class FormsService {

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
                        pattern: 'It is not correct format.',
                        maxLength: 'Service name\' max length is 30.',
                        required: 'Service name is required.',
                    },
                    serviceId: {
                        pattern: 'Service id must be a number.',
                        required: 'Service id is required.',
                    },
                    weight: {
                        pattern: 'Weight must be a number.',
                        required: 'Weight is required.',
                    },
                    weights: {
                        overflow: 'Error. Sum of weights should be 100%.',
                    },
                },
            },
        },
    };

    get VALIDATION_PATTERNS() {
        return this._VALIDATION_PATTERNS;
    }

    get MESSAGES() {
        return this._MESSAGES;
    }

    public setErrors(form, formErrors: object, validationMessages: object) {
        if (!form) { return; }

        for (const field in formErrors) {
            // clear previous error message (if any)
            if (formErrors.hasOwnProperty(field)) {
                const control = form.get(field);
                if (control) {
                    formErrors[field] = '';
                }

                if (control instanceof FormArray) {
                    this.setErrors(control.controls[0], formErrors, validationMessages);
                }

                if (control && control.dirty && !control.valid) {
                    const messages = validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

}
