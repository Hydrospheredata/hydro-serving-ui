import { TestBed, inject } from '@angular/core/testing';

import { HttpModelsService } from './http-models.service';

describe('HttpModelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpModelsService]
    });
  });

  it('should be created', inject([HttpModelsService], (service: HttpModelsService) => {
    expect(service).toBeTruthy();
  }));
});
