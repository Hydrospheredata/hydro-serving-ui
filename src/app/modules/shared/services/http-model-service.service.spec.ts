import { TestBed, inject } from '@angular/core/testing';

import { HttpModelServiceService } from './http-model-service.service';

describe('ModelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpModelServiceService]
    });
  });

  it('should be created', inject([HttpModelServiceService], (service: HttpModelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
