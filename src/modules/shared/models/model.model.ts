// import { CurrentServices } from './current-services.model';
// import { ModelBase } from './model-base.model';
// import { ModelRuntime } from './model-runtime.model';
import { ModelBuild } from './model-build.model';
import { ModelVersion } from './model-version.model';

// export class Model {
  
//     public currentServices: CurrentServices[];
//     public nextVersion: string;
//     public nextVersionAvailable: boolean;
//     public model: ModelBase;
//     public lastModelRuntime: ModelRuntime;
//     public lastModelBuild: ModelBuild;

//     constructor(props: any = {}) {
//         this.currentServices = props['currentServices'];
//         this.nextVersion = props['nextVersion'] || '';
//         this.nextVersionAvailable = props['nextVersionAvailable'] || false;
//         this.model = props['model'];
//         if (props['lastModelRuntime']) {
//             this.lastModelRuntime = props['lastModelRuntime'];    
//         }
//         if (props['lastModelBuild']) {
//             this.lastModelBuild = props['lastModelBuild'];    
//         }
//     }
// }


export class Model {
    public created: string;
    public updated: string;
    public id: number;
    public modelContract: string;
    public modelType: string;
    public name: string;
    public source: string;
    public lastModelBuild: ModelBuild;
    public lastModelVersion: ModelVersion;

    constructor(props: any = {}) {
        this.created = props['created'];
        this.updated = props['updated'];
        this.id = props['id'];
        this.modelContract = props['modelContract'];
        this.modelType = props['modelType'];
        this.name = props['name'];
        this.source = props['source'];
        if (props['lastModelBuild']) {
            this.lastModelBuild = props['lastModelBuild'];    
        }
        if (props['lastModelVersion']) {
            this.lastModelVersion = props['lastModelVersion'];    
        }
    }
}

