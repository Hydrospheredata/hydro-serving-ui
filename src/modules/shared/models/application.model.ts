export class Application {
    public id: number;
    public name: string;
    public stages: any[];
    // public kafkaStreamingSources: {serviceId: number, sourceTopic: string, destinationTopic: string, brokerList: string[]}[];

    constructor(props: any = {}) {
        this.id = props['id'];
        this.name = props['name'];
        this.stages = props['stages'];
        // this.kafkaStreamingSources = props['kafkaStreamingSources'];
    }
}
