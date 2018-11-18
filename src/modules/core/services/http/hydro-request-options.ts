import { BaseRequestOptions } from '@angular/http';

export class HydroRequestOptions extends BaseRequestOptions {

    constructor(mistOptions?: object) {

        super();

        this.headers.append('Content-Type', 'application/json');

        if (mistOptions != null) {
            // tslint:disable-next-line:forin
            for (const option in mistOptions) {
                const optionValue = mistOptions[option];
                this[option] = optionValue;
            }
        }
    }
}
