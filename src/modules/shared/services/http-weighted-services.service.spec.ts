import { TestBed, inject } from '@angular/core/testing';

import { HttpWeightedServicesService } from './http-weighted-services.service';
import { HttpService } from './http.service';

describe('HttpWeightedServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpWeightedServicesService, { provide: HttpService, useValue: {} }]
    });
  });

  it('should be created', inject([HttpWeightedServicesService], (service: HttpWeightedServicesService) => {
    expect(service).toBeTruthy();
  }));
});
