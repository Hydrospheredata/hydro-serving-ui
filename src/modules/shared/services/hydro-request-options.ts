import { BaseRequestOptions } from '@angular/http';

export class HydroRequestOptions extends BaseRequestOptions {

  constructor (mistOptions?: any) {

    super();

    this.headers.append('Content-Type', 'application/json');

    if (mistOptions != null) {
      for (let option in mistOptions) {
        const optionValue = mistOptions[option];
        this[option] = optionValue;
      }
    }
  }
}
