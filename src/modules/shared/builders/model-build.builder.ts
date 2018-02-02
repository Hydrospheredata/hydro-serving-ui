import { Injectable } from '@angular/core';
import { ModelBuild } from '@shared/models/_index';

@Injectable()
export class ModelBuildBuilder {

    constructor() { }

    public build(props): ModelBuild {
        return this.toModelBuild(props);
    }

    private toModelBuild(props) {
        let lastModelBuild: ModelBuild;
        
        if (props) {
            lastModelBuild = new ModelBuild({
                id: props['id'],
                model: props['model'],
                finished: props['finished'],
                started: props['started'],
                statusText: props['statusText'],
                status: props['status'],
                version: props['version']
            });

            return lastModelBuild;
        }
    }

}
