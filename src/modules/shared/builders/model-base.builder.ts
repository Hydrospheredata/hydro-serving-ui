import { Injectable } from '@angular/core';
import { Model } from '@shared/models/_index';



@Injectable()
export class ModelBuilder {

    constructor() { }

    public build(props): Model {
        return this.toModel(props);
    }

    private toModel(props): Model {
        let model = new Model({
            created: props['created'],
            updated: props['updated'],
            id: props['id'],
            modelContract: props['modelContract'],
            modelType: props['modelType'],
            name: props['name'],
            source: props['source']
        });
        return model;
    }
}
