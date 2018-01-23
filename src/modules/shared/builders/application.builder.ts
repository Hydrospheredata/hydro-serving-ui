import { Injectable } from '@angular/core';
import { Application } from '@shared/models/_index';



@Injectable()
export class ServiceBuilder {

    constructor() { }

    public build(service) {
        return new Application(service);
    }

}
