import { DeploymentConfig } from './deployment-config';
import { Signature } from '@app/core/data/types/signature';

export interface ApplicationCreatingRequest {
  name: string;
  kafkaStreaming: any[];
  executionGraph: {
    stages: {
      modelVariants: {
        modelVersionId: number;
        weight: number;
      }[];
    }[];
  };
  deploymentConfiguration: DeploymentConfig;
}

export interface ApplicationUpdateRequest {
  name: string;
  kafkaStreaming?: any[];
  executionGraph: {
    stages: {
      modelVariants: {
        modelVersionId: number;
        weight: number;
        deploymentConfigName: string;
      }[];
    }[];
  };
  deploymentConfiguration: DeploymentConfig;
}

export interface KafkaStreaming {
  sourceTopic: string;
  destinationTopic: string;
  consumerId?: string;
  errorTopic?: string;
}

export enum TestStatus {
  Failed = 'failed',
  Pending = 'pending',
  Success = 'success',
  Undefined = '',
}

export enum ApplicationStatus {
  Assembling = 'assembling',
  Ready = 'ready',
  Failed = 'failed',
  Undefined = 'undefined',
}

export interface Stage {
  modelVariants: ModelVariant[];
  signature: string;
}

export interface ModelVariant {
  servableName?: string;
  modelVersionId: number;
  weight: number;
  deploymentConfigurationName: string;
}

export interface ExecutionGraph {
  stages: Stage[];
}

export class Application {
  id?: number;
  signature?: Signature;
  name: string;
  executionGraph: ExecutionGraph;
  namespace?: string;
  kafkaStreaming?: KafkaStreaming[];
  input: string;
  output: string;
  testStatus?: TestStatus;
  error?: string;
  status: string;
  message?: string;
  favorite: boolean;
  deploymentConfiguration: DeploymentConfig;

  constructor(props: any = {}) {
    if (props.id) {
      this.id = props.id;
    }
    if (props.signature) {
      this.signature = props.signature;
    }
    this.name = props.name;
    this.executionGraph = props.executionGraph;
    this.kafkaStreaming = props.kafkaStreaming;
    this.input = props.input || null;
    this.output = props.output || null;
    this.namespace = props.namespace || null;
    this.testStatus = props.testStatus || null;
    this.error = props.error || '';
    this.testStatus = props.testStatus || TestStatus.Undefined;
    this.status = props.status;
    this.message = props.message;
    this.favorite = props.favorite || false;
    this.deploymentConfiguration = props.deploymentConfiguration;
  }
}
