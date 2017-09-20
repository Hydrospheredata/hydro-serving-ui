export class Service {
    public id: number;
    public serviceName: string;
    public weights: any;

    constructor(props: any = {}) {
        this.id = props['id'];
        this.serviceName = props['serviceName'];
        this.weights = props['weights'];
    }
}
