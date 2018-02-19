export class Application {
    public id?: number;
    public name: string;
    public executionGraph?: { stages: any[] }[];
    public kafkaStreaming?: { sourceTopic: string, destinationTopic: string, consumerId?: string, errorTopic?: string }[];

    constructor(props: any = {}) {
        this.id = props['id'];
        this.name = props['name'];
        this.executionGraph = props['executionGraph'];
        this.kafkaStreaming = props['kafkaStreaming'];
    }
}
