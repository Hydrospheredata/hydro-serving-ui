import { TestBed, inject } from '@angular/core/testing';

import { ModelBuildService } from './model-build.service';

describe('ModelBuildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelBuildService]
    });
  });

  it('should be created', inject([ModelBuildService], (service: ModelBuildService) => {
    expect(service).toBeTruthy();
  }));
});
