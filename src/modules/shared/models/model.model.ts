// import { RuntimeType } from './runtime-type.model';
// import { ModelRuntime } from './model-runtime.model';
// import { ModelBuild } from './model-build.model';
// import { CurrentServices } from './current-services.model';

// export class Model {
//   public id: number;
//   public modelId: number;
//   public name: string;
//   public source: string;
//   public description: string;
//   public outputFields: string[];
//   public inputFields: string[];
//   public created: string;
//   public updated: string;
//   public runtimeType: RuntimeType;
//   public lastModelRuntime: ModelRuntime;
//   public lastModelBuild: ModelBuild;
//   public currentServices: CurrentServices[];
//   public nextVersion: string;
//   public nextVersionAvailable: boolean;

//   constructor(props: any = {}) {
//       this.id = props['id'] || '';
//       this.name = props['name'] || '';
//       this.source = props['source'] || '';
//       this.description = props['description'] || '';
//       this.modelId = props['modelId'] || '';
//       this.outputFields = props['outputFields'] || [''];
//       this.inputFields = props['inputFields'] || [''];
//       this.created = props['created'] || '';
//       this.updated = props['updated'] || '';
//       this.runtimeType = props['runtimeType'] || {};
//       this.lastModelRuntime = props['lastModelRuntime'] || {};
//       this.lastModelBuild = props['lastModelBuild'] || {};
//       this.currentServices = props['currentServices'];
//       this.nextVersion = props['nextVersion'] || '';
//       this.nextVersionAvailable = props['nextVersionAvailable'] || false;
//   }
// }

import { CurrentServices } from './current-services.model';
import { ModelBase } from './model-base.model';
import { ModelRuntime } from './model-runtime.model';
import { ModelBuild } from './model-build.model';

export class Model {
  
    public currentServices: CurrentServices[];
    public nextVersion: string;
    public nextVersionAvailable: boolean;
    public model: ModelBase;
    public lastModelRuntime: ModelRuntime;
    public lastModelBuild: ModelBuild;

    constructor(props: any = {}) {
        this.currentServices = props['currentServices'];
        this.nextVersion = props['nextVersion'] || '';
        this.nextVersionAvailable = props['nextVersionAvailable'] || false;
        this.model = props['model'];
        if (props['lastModelRuntime']) {
            this.lastModelRuntime = props['lastModelRuntime'];    
        }
        if (props['lastModelBuild']) {
            this.lastModelBuild = props['lastModelBuild'];    
        }
    }
}

