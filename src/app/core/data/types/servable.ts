import { ModelVersionId } from './model-version';
import { Observable } from 'rxjs';

export enum Status {
  Serving = 'Serving',
  NotServing = 'NotServing',
  Starting = 'Starting',
  Undefined = 'Undefined',
  Warning = 'Warning',
}

export class Servable {
  modelVersionId: ModelVersionId;
  fullName: string;
  name?: string;
  status: string;
  statusMessage?: string;
  message?: string;
  logStream: Observable<any>;
  deploymentConfigurationName: string;
}

export class MappedServable {
  fullName: string;
  name?: string;
  status: string;
  message?: string;
}
