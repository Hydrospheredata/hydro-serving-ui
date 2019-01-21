import { Injectable } from '@angular/core';
import { Model, ModelBuild, ModelVersion } from '@shared/models/_index';
import { ModelBuildBuilder } from './model-build.builder';
import { ModelVersionBuilder } from './model-version.builder';

@Injectable()
export class ModelBuilder {
    public build(props): Model {
        return this.toModel(props);
    }

    private toModel(props): Model {
        const model = new Model({
            id: props.id || undefined,
            name: props.name || undefined,
        });

        return model;
    }
}
