import { TestBed } from '@angular/core/testing';

import { DeploymentConfigsApiService } from './deployment-configs-api.service';

describe('DeploymentConfigsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeploymentConfigsApiService = TestBed.get(DeploymentConfigsApiService);
    expect(service).toBeTruthy();
  });
});
