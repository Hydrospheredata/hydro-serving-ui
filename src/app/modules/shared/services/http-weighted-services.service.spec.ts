import { TestBed, inject } from '@angular/core/testing';

import { HttpWeightedServicesService } from './http-weighted-services.service';

describe('HttpWeightedServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpWeightedServicesService]
    });
  });

  it('should be created', inject([HttpWeightedServicesService], (service: HttpWeightedServicesService) => {
    expect(service).toBeTruthy();
  }));
});
