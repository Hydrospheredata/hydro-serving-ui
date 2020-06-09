import { ModelVersionDTO, ModelDTO } from '@shared/dto';
import { ModelContract, Input, Output } from '@shared/interfaces';
import { Image } from '@shared/models/image.model';
import { Runtime } from '@shared/models/runtime.model';

export enum ModelVersionStatus {
  Assembling = 'assembling',
  Released = 'released',
  Failed = 'failed',
  Undefined = 'undefined',
}

export class ModelVersion {
  public id: number;
  public image: Image;
  public created: string;
  public finished: string;
  public modelVersion: number;
  public modelContract: ModelContract;
  public runtime: Runtime;
  public model: ModelDTO;
  public status: ModelVersionStatus;
  public applications: string[];
  public metadata: object;
  public isExternal: boolean;

  constructor(props: ModelVersionDTO) {
    this.id = props.id;
    this.image = props.image;
    this.created = props.created;
    this.finished = props.finished;
    this.modelVersion = props.modelVersion;
    this.modelContract = new ModelContract(props.modelContract);
    this.runtime = props.runtime;
    this.model = props.model;
    this.status = props.status;
    this.applications = props.applications;
    this.metadata = props.metadata;
    this.isExternal = props.isExternal;
  }

  get contractInputs(): Input[] {
    return this.modelContract.inputs;
  }

  get contractOutputs(): Output[] {
    return this.modelContract.outputs;
  }
}
