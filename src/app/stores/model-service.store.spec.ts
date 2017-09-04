import { TestBed, inject } from '@angular/core/testing';

import { ModelServiceStore } from './model-service.store';

describe('ModelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelServiceStore]
    });
  });

  it('should be created', inject([ModelServiceStore], (service: ModelServiceStore) => {
    expect(service).toBeTruthy();
  }));
});
