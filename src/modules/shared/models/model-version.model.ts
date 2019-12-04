import { HostSelector } from '@shared/models/hostSelector.model';
import { Image } from '@shared/models/image.model';
import { Runtime } from '@shared/models/runtime.model';
import { ISignature } from '@shared/models/signature.model';
import { Model } from './model.model';

export enum ModelVersionStatus {
    Assembling = 'assembling',
    Released = 'released',
    Failed = 'failed',
    Undefined = 'undefined',
}

export interface ModelContract {
    modelName: string;
    predict: ISignature;
}
export class ModelVersion {
    public id: number;
    public image: Image;
    public created: Date;
    public finished: Date;
    public modelVersion: number;
    public modelContract: ModelContract;
    public runtime: Runtime;
    public model: Model;
    public hostSelector: HostSelector;
    public status: ModelVersionStatus;
    public applications: string[];
    public metadata: object;
    public isExternal: boolean;

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
        this.metadata = props.metadata;
        this.isExternal = props.isExternal;
    }
}
