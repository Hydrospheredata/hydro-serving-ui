import { Injectable } from '@angular/core';
import { ModelVersion } from '@shared/models/_index';



@Injectable()
export class ModelVersionBuilder {

    constructor() { }

    public build(props): ModelVersion {
        return this.toModelVersion(props);
    }

    private toModelVersion(props) {
        let lastModelVersion: ModelVersion;

        if (props) {
            lastModelVersion = new ModelVersion({
                id: props['id'],
                model: props['model'],
                source: props['source'],
                created: props['created'],
                modelContract: props['modelContract'],
                imageName: props['imageName'],
                imageTag: props['imageTag'],
                modelName: props['modelName'],
                modelType: props['modelType'],
                imageSHA256: props['imageSHA256'],
                modelVersion: props['modelVersion'],
            });

            return lastModelVersion;
        }
    }

}
