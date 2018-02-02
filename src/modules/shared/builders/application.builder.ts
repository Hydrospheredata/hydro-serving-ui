import { Injectable } from '@angular/core';
import { Application } from '@shared/models/_index';



@Injectable()
export class ApplicationBuilder {

    constructor() { }

    public build(app) {
        return new Application(app);
    }

}
