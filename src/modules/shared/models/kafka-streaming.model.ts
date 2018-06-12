export interface IKafkaStreaming {
    sourceTopic: string;
    destinationTopic: string;
    consumerId?: string;
    errorTopic?: string;
}
