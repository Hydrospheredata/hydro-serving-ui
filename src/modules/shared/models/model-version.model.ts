import { HostSelector } from '@shared/models/hostSelector.model';
import { Image } from '@shared/models/image.model';
import { Runtime } from '@shared/models/runtime.model';
import { ISignature } from '@shared/models/signature.model';
import { Model } from './model.model';

export type ModelVersionStatus = 'started' | 'finished' | 'failed';

export interface IModelContract {
    modelName: string;
    signatures: ISignature[];
}
export interface IModelVersion {
    id: number;
    image: Image;
    created: Date;
    finished: Date;
    modelVersion: number;
    modelContract: IModelContract;
    runtime: Runtime;
    model: Model;
    hostSelector: HostSelector;
    status: ModelVersionStatus;
    applications: string[];
}
export class ModelVersion implements IModelVersion {
    public id: number;
    public image: Image;
    public created: Date;
    public finished: Date;
    public modelVersion: number;
    public modelContract: IModelContract;
    public runtime: Runtime;
    public model: Model;
    public hostSelector: HostSelector;
    public status: ModelVersionStatus;
    public applications: string[];

    constructor(props: any = {}) {
        this.id = props.id;
        this.image = props.image;
        this.created = props.created;
        this.finished = props.finished;
        this.modelVersion = props.modelVersion;
        this.modelContract = props.modelContract;
        this.runtime = props.runtime;
        this.model = props.model;
        this.hostSelector = props.hostSelector;
        this.status = props.status;
        this.applications = props.applications;
    }
}
