import { ModelVersion } from '@shared/_index';
import { Observable } from 'rxjs';

export class Servable {
  modelVersion: ModelVersion;
  fullName: string;
  status: {
    msg: string;
    host: string;
    port: number;
    status: string;
  };
  logStream: Observable<any>;
}
