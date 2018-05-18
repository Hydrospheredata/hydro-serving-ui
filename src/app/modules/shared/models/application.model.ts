export interface IKafkaStreaming {
    sourceTopic: string;
    destinationTopic: string;
    consumerId?: string;
    errorTopic?: string;
}

export interface IApplication {
    id?: number;
    contract?: string;
    name: string;
    executionGraph?: any;
    kafkaStreaming?: IKafkaStreaming[];
}

export class Application implements IApplication {
    public id?: number;
    public contract?: string;
    public name: string;
    public executionGraph?: any;
    public kafkaStreaming?: { sourceTopic: string, destinationTopic: string, consumerId?: string, errorTopic?: string }[];

    constructor(props: any = {}) {
        if (props['id']) { this.id = props['id']; }
        if (props['contract']) { this.contract = props['contract']; }
        this.name = props['name'];
        this.executionGraph = props['executionGraph'];
        this.kafkaStreaming = props['kafkaStreaming'];
    }
}
