export class ModelBase {
    public created: string;
    public updated: string;
    public id: number;
    public modelContract: string;
    public modelType: string;
    public name: string;
    public source: string;

    constructor(props: any = {}) {
        this.created = props['created'];
        this.updated = props['updated'];
        this.id = props['id'];
        this.modelContract = props['modelContract'];
        this.modelType = props['modelType'];
        this.name = props['name'];
        this.source = props['source'];
    }
}