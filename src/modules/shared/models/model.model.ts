import { ModelBuild } from './model-build.model';
import { ModelVersion } from './model-version.model';



export class Model {
    public created: string;
    public updated: string;
    public id: number;
    public modelContract: string;
    public modelType: string;
    public name: string;
    public source: string;
    public lastModelBuild?: ModelBuild;
    public lastModelVersion?: ModelVersion;
    public nextVersion?: number;

    constructor(props: any = {}) {
        this.created = props['created'];
        this.updated = props['updated'];
        this.id = props['id'];
        this.modelContract = props['modelContract'];
        this.modelType = props['modelType'];
        this.name = props['name'];
        this.source = props['source'];
        if (props['lastModelBuild']) { this.lastModelBuild = props['lastModelBuild']; }
        if (props['lastModelVersion']) { this.lastModelVersion = props['lastModelVersion']; }
        if (props['nextVersion']) { this.nextVersion = props['nextVersion']; }
    }
}

