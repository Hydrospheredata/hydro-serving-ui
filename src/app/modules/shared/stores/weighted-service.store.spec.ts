import { TestBed, inject } from '@angular/core/testing';

import { WeightedServiceStore } from './weighted-service.store';

describe('WeightedServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeightedServiceStore]
    });
  });

  it('should be created', inject([WeightedServiceStore], (service: WeightedServiceStore) => {
    expect(service).toBeTruthy();
  }));
});
