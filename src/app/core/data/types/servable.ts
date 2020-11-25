import { ModelVersion } from './model-version';
import { Observable } from 'rxjs';
import { DeploymentConfig } from './deployment-config';

type ServableStatus = 'Serving' | 'NotServing';

export class Servable {
  modelVersion: ModelVersion;
  fullName: string;
  status: {
    msg: string;
    host: string;
    port: number;
    status: ServableStatus;
  };
  logStream: Observable<any>;
  deploymentConfiguration?: DeploymentConfig;
}
