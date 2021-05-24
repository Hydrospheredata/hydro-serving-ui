import { ModelVersion } from './model-version';
import { Observable } from 'rxjs';
import { DeploymentConfig } from './deployment-config';

export enum Status {
  Serving = 'Serving',
  NotServing = 'NotServing',
  Starting = 'Starting',
  Undefined = 'Undefined',
  Warning = 'Warning',
}

export class Servable {
  modelVersion: ModelVersion;
  fullName: string;
  name?: string;
  status: string;
  statusMessage?: string;
  message?: string;
  logStream: Observable<any>;
  deploymentConfiguration?: DeploymentConfig;
}

export class MappedServable {
  fullName: string;
  name?: string;
  status: string;
  message?: string;
}
