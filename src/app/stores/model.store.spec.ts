import { TestBed, inject } from '@angular/core/testing';

import { ModelStore } from './model-store.service';

describe('ModelStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelStore]
    });
  });

  it('should be created', inject([ModelStore], (service: ModelStore) => {
    expect(service).toBeTruthy();
  }));
});
