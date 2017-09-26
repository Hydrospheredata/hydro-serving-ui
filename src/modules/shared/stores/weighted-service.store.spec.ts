import { TestBed, inject } from '@angular/core/testing';

import { WeightedServiceStore } from './weighted-service.store';
import { HttpWeightedServicesService } from '@shared/services/_index';

describe('WeightedServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightedServiceStore, { provide: HttpWeightedServicesService, useValue: {} }]
    });
  });

  it('should be created', inject([WeightedServiceStore], (service: WeightedServiceStore) => {
    expect(service).toBeTruthy();
  }));
});
