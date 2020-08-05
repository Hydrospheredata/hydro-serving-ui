import { Injectable } from '@node_modules/@angular/core';
import { Observable, of } from '@node_modules/rxjs';
import { DeploymentConfigsMock } from '../mocks/deployment-configs.mock';
import { DeploymentConfig } from '../models';
import { DeploymentConfigsApiService } from '../services/deployment-configs-api.service';

@Injectable({ providedIn: 'root' })
export class DeploymentConfigsFacade {
  constructor(private readonly api: DeploymentConfigsApiService) {}

  get(): Observable<DeploymentConfig> {
    return of(DeploymentConfigsMock);
    // return this.api.get();
  }
}
