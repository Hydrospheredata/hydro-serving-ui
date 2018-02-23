import { Model } from './model.model';
import { ModelVersion } from './model-version.model';



export class ModelBuild {
    public id: number;
    public model: Model;
    public finished: Date;
    public started: Date;
    public statusText: string;
    public status: string;
    public version: number;
    public modelVersion: ModelVersion;

    constructor(props: any = {}) {
        this.id = props['id'] || 0;
        this.model = props['model'] || new Model();
        this.finished = props['finished'] || '';
        this.started = props['started'] || '';
        this.statusText = props['statusText'] || '';
        this.status = props['status'] || '';
        this.version = props['version'] || 1;
        this.modelVersion = props['modelVersion'] || new ModelVersion();
    }
}
