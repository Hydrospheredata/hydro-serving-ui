import { Injectable } from '@angular/core';
import { ModelBuild } from '@shared/models/_index';

@Injectable()
export class ModelBuildBuilder {

    constructor() { }

    public build(props): ModelBuild {
        return this.toModel(props);
    }

    private toModel(props) {
        let lastModelBuild: ModelBuild;
        if (props) {
            lastModelBuild = new ModelBuild({
                id: props.id,
                model: props.model,
                finished: props.finished,
                started: props.started,
                statusText: props.statusText,
                status: props.status,
                modelRuntime: props.modelRuntime,
                modelVersion: props.modelVersion
            });

            return lastModelBuild;
        }
    }

}
