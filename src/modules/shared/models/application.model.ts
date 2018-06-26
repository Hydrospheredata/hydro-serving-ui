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
    input: string;
    output: string;
    namespace?: string;
}

export class Application implements IApplication {
    public id?: number;
    public contract?: string;
    public name: string;
    public executionGraph?: any;
    public namespace?: string;
    public kafkaStreaming?: { sourceTopic: string, destinationTopic: string, consumerId?: string, errorTopic?: string }[];
    public input: string;
    public output: string;

    constructor(props: any = {}) {
        if (props['id']) { this.id = props['id']; }
        if (props['contract']) { this.contract = props['contract']; }
        this.name = props['name'];
        this.executionGraph = props['executionGraph'];
        this.kafkaStreaming = props['kafkaStreaming'];
        this.input = props['input'] || null;
        this.output = props['output'] || null;
        this.namespace = props['namespace'] || null;
    }
}
