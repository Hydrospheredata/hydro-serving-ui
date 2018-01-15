import { Injectable } from '@angular/core';
import { ModelBase } from '@shared/models/_index';

@Injectable()
export class ModelBaseBuilder {

    constructor() { }

    public build(props): ModelBase {
        return this.toModelBase(props);
    }

    private toModelBase(props): ModelBase {
        console.log('before builder of modelBase: ', props);
        let modelBase = new ModelBase({
            created: props['created'],
            updated: props['updated'],
            id: props['id'],
            modelContract: props['modelContract'],
            modelType: props['modelType'],
            name: props['name'],
            source: props['source']
        });
        console.log('before builder of modelBase: ', modelBase);
        return modelBase;
    }
}
