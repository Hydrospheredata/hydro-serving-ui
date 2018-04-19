export class Application {
    public id?: number;
    public contract?: string;
    public name: string;
    public executionGraph?: { stages: any[] }[];
    public kafkaStreaming?: { sourceTopic: string, destinationTopic: string, consumerId?: string, errorTopic?: string }[];

    constructor(props: any = {}) {
        if (props['id']) { this.id = props['id']; }
        if (props['contract']) { this.contract = props['contract']; }
        this.name = props['name'];
        this.executionGraph = props['executionGraph'];
        this.kafkaStreaming = props['kafkaStreaming'];
    }
}
