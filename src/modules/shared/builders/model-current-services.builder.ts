import { Injectable } from '@angular/core';
import { CurrentServices } from '@shared/models/_index';

@Injectable()
export class ModelCurrentServicesBuilder {

    constructor() { }

    public build(props): CurrentServices[] {
        return this.toCurrentServices(props);
    }

    private toCurrentServices(props): CurrentServices[] {
        let currentServices: CurrentServices[] = [];
        for (let i = 0; i < props.length; i++) {
            currentServices.push(new CurrentServices(props[i]));
        }

        return currentServices;
    }
}
