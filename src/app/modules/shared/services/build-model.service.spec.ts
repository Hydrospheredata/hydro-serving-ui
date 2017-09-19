import { TestBed, inject } from '@angular/core/testing';

import { BuildModelService } from './build-model.service';

describe('BuildModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildModelService]
    });
  });

  it('should be created', inject([BuildModelService], (service: BuildModelService) => {
    expect(service).toBeTruthy();
  }));
});
