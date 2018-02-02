import { Model } from './model.model';



export class ModelVersion {
    public id: number;
    public model: Model;
    public source: string;
    public created: Date;
    public modelContract: string;
    public imageName: string;
    public imageTag: string;
    public modelName: string;
    public modelType: string;
    public imageSHA256: string;
    public modelVersion: number;

    constructor(props: any = {}) {
        this.id = props['id'] || 1;
        this.model = props['model'] || new Model();
        this.source = props['source'] || '';
        this.created = props['created'];
        this.modelContract = props['modelContract'] || '';
        this.imageName = props['imageName'] || '';
        this.imageTag = props['imageTag'] || '';
        this.modelName = props['modelName'] || '';
        this.modelType = props['modelType'] || '';
        this.imageSHA256 = props['imageSHA256'] || '';
        this.modelVersion = props['modelVersion'] || 1;
    }
}
