import { TestBed, inject } from '@angular/core/testing';

import { ServingEnvironmentService } from './serving-environment.service';

describe('ServingEnvironmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServingEnvironmentService]
    });
  });

  it('should be created', inject([ServingEnvironmentService], (service: ServingEnvironmentService) => {
    expect(service).toBeTruthy();
  }));
});
