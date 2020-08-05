import { Injectable } from '@angular/core';
import { of, Observable } from '@node_modules/rxjs';
import { DeploymentConfig } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DeploymentConfigsApiService {
  constructor() {}

  get(): Observable<DeploymentConfig> {
    return of();
  }
}
