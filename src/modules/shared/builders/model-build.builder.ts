import { Injectable } from '@angular/core';
import { ModelBuild, ModelVersion } from '@shared/models/_index';
import { ModelVersionBuilder } from './model-version.builder';



@Injectable()
export class ModelBuildBuilder {

    constructor(
        private modelVersionBuilder: ModelVersionBuilder
    ) { }

    public build(props): ModelBuild {
        return this.toModelBuild(props);
    }

    private toModelBuild(props) {
        let modelVersion: ModelVersion;

        if (props['modelVersion']) {
            modelVersion = this.modelVersionBuilder.build(props['modelVersion']);
        }

        const modelBuild = new ModelBuild({
            id: props['id'],
            model: props['model'],
            finished: props['finished'],
            started: props['started'],
            statusText: props['statusText'],
            status: props['status'],
            version: props['version'],
            modelVersion: modelVersion,
        });

        return modelBuild;
    }

}
