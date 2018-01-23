// import { Injectable } from '@angular/core';
// import { ModelBase, Model, CurrentServices, ModelRuntime, ModelBuild } from '@shared/models/_index';
// import { ModelCurrentServicesBuilder } from './model-current-services.builder';
// import { ModelBaseBuilder } from './model-base.builder';
// import { ModelRuntimeBuilder } from './model-runtime.builder';
// import { ModelBuildBuilder } from './model-build.builder';



// @Injectable()
// export class ModelBuilder {

//     constructor(
//         private modelCurrentServicesBuilder: ModelCurrentServicesBuilder,
//         private modelBaseBuilder: ModelBaseBuilder,
//         private modelRuntimeBuilder: ModelRuntimeBuilder,
//         private modelBuildBuilder: ModelBuildBuilder
//     ) { }

//     public build(props): Model {
//         return this.toModel(props);
//     }

//     private toModel(props) {
//         let model: Model;
//         let modelBase: ModelBase;
//         let modelRuntime: ModelRuntime;
//         let modelBuild: ModelBuild;
//         let currentServices: CurrentServices[] = [];

//         if (props['currentServices'] && props['currentServices'].length) {
//             currentServices = this.modelCurrentServicesBuilder.build(props['currentServices']);
//         }

//         if (props['model']) {          
//             modelBase = this.modelBaseBuilder.build(props['model']);
//         }

//         if (props['lastModelRuntime']) {          
//             modelRuntime = this.modelRuntimeBuilder.build(props['lastModelRuntime']);
//         }

//         if (props['lastModelBuild']) {          
//             modelBuild = this.modelBuildBuilder.build(props['lastModelBuild']);
//         }

//         model = new Model({
//             nextVersion: props['nextVersion'],
//             nextVersionAvailable: props['nextVersionAvailable'],
//             currentServices: currentServices,
//             model: modelBase,
//             lastModelBuild: modelBuild,
//             lastModelRuntime: modelRuntime
//         });

//         return model;
//     }
// }



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
