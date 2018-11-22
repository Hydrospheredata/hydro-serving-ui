export class Runtime {
    public id: number;
    public name: string;
    public version: string;
    public suitableModelType: any[];
    public tags: string[];
    public configParams: any;

    constructor(props: any = {}) {
        this.id = props.id;
        this.name = props.name;
        this.version = props.version;
        this.suitableModelType = props.suitableModelType;
        this.tags = props.tags;
        this.configParams = props.configParams;
    }
}
