import { IKafkaStreaming } from "@shared/_index";

export interface IFormServiceDescription {
    runtimeId: number;
    modelVersionId: number,
    environmentId?: number,
    modelName: string,
    runtimeName: string
}

export interface IFormService {
    weight: number;
    signature: string;
    serviceDescription: IFormServiceDescription;
}

export interface IFormStage {
    services: IFormService[]
}

export interface IForm {
    applicationName: string;
    applicationNamespace?: string;
    stages: IFormStage[];
    kafkaStreaming: IKafkaStreaming[]
}

export class Form implements IForm {
    public applicationName: string;
    public applicationNamespace?: string;
    public stages: IFormStage[];
    public kafkaStreaming: IKafkaStreaming[]

    constructor(props: any = {}) {
        this.applicationName = props['applicationName'] || null;
        this.applicationNamespace = props['applicationNamespace'] || null;
        this.stages = props['stages'] || [];
        this.kafkaStreaming = props['kafkaStreaming'] || [];
    }
}
