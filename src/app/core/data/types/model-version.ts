import { ModelSignature, Input, Output } from './model-contract';
import { Image } from './image';
import { Runtime } from './runtime';
import { ModelDTO } from './model';

export interface ModelVersionDTO {
  id: number;
  created: string;
  finished: string;
  modelVersion: number;
  modelSignature: ModelSignature;
  model: ModelDTO;
  status: ModelVersionStatus;
  metadata: ModelVersionMetadata;
  applications: string[];
  image: { sha256: string; name: string; tag: string };
  runtime: { sha256: string; name: string; tag: string };
  isExternal: boolean;
}

export enum ModelVersionStatus {
  Assembling = 'assembling',
  Released = 'released',
  Failed = 'failed',
  Undefined = 'undefined',
}

export type ModelVersionMetadata = { is_metric?: boolean } & {
  [key: string]: string;
};

export type ModelVersionId = number;

export class ModelVersion {
  public id: ModelVersionId;
  public image: Image;
  public created: string;
  public finished: string;
  public modelVersion: number;
  public modelSignature: ModelSignature;
  public runtime: Runtime;
  public model: ModelDTO;
  public status: ModelVersionStatus;
  public applications: string[];
  public metadata: ModelVersionMetadata;
  public isExternal: boolean;

  constructor(props: Partial<ModelVersion>) {
    this.id = props.id;
    this.image = props.image;
    this.created = props.created;
    this.finished = props.finished;
    this.modelVersion = props.modelVersion;
    this.modelSignature = props.modelSignature;
    this.runtime = props.runtime;
    this.model = props.model;
    this.status = props.status;
    this.applications = props.applications;
    this.metadata = props.metadata;
    this.isExternal = props.isExternal;
  }

  get contractInputs(): Input[] {
    return this.modelSignature.inputs;
  }

  get contractOutputs(): Output[] {
    return this.modelSignature.outputs;
  }

  isReleasedAndInternal(): boolean {
    return this.status === ModelVersionStatus.Released && !this.isExternal;
  }

  clone(update: Partial<ModelVersion>): ModelVersion {
    return new ModelVersion({ ...this, ...update });
  }
}
