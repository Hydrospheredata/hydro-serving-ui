import { Injectable } from '@angular/core';
import { Model, ModelBuild, ModelVersion } from '@shared/models/_index';
import { ModelBuildBuilder } from './model-build.builder';
import { ModelVersionBuilder } from './model-version.builder';



@Injectable()
export class ModelBuilder {

    constructor(
        private modelBuildBuilder: ModelBuildBuilder,
        private modelVersionBuilder: ModelVersionBuilder
    ) { }

    public build(props): Model {
        return this.toModel(props);
    }

    private toModel(props): Model {
        let lastModelBuild: ModelBuild;
        let lastModelVersion: ModelVersion;
        let nextVersion: number;

        if (props['lastModelBuild']) {
            lastModelBuild = this.modelBuildBuilder.build(props['lastModelBuild']);
        }
        if (props['lastModelVersion']) {
            lastModelVersion = this.modelVersionBuilder.build(props['lastModelVersion']);
        }
        if (props['nextVersion']) {
            nextVersion = props['nextVersion'];
        }

        const model = new Model({
            created: props.model['created'],
            updated: props.model['updated'],
            id: props.model['id'],
            modelContract: props.model['modelContract'],
            modelType: props.model['modelType'],
            name: props.model['name'],
            source: props.model['source'],
            lastModelBuild: lastModelBuild,
            lastModelVersion: lastModelVersion,
            nextVersion: nextVersion,
        });

        return model;
    }
}
