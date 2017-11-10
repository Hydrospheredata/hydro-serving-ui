export class Service {
    public id: number;
    public serviceName: string;
    public stages: any[];
    public kafkaStreamingSources: {serviceId: number, sourceTopic: string, destinationTopic: string, brokerList: string[]}[];

    constructor(props: any = {}) {
        this.id = props['id'];
        this.serviceName = props['serviceName'];
        this.stages = props['stages'];
        this.kafkaStreamingSources = props['kafkaStreamingSources'];
    }
}
