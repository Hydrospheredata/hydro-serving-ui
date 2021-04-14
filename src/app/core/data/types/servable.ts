import { ModelVersion } from './model-version';
import { Observable } from 'rxjs';
import { DeploymentConfig } from './deployment-config';

type ServableStatus = 'Serving' | 'NotServing' | 'Starting';

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
