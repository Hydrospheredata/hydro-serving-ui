export class Service {
    public id: number;
    public serviceName: string;
    public weights: any[];
    public kafkaStreamingSources: {serviceId: number, sourceTopic: string, destinationTopic: string, brokerList: string[]}[];

    constructor(props: any = {}) {
        this.id = props['id'];
        this.serviceName = props['serviceName'];
        this.weights = props['weights'];
        this.kafkaStreamingSources = props['kafkaStreamingSources'];
    }
}
