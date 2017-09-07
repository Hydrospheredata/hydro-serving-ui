import { TestBed, inject } from '@angular/core/testing';

import { ModelRuntimeStore } from './model-runtime.store';

describe('ModelRuntimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelRuntimeStore]
    });
  });

  it('should be created', inject([ModelRuntimeStore], (service: ModelRuntimeStore) => {
    expect(service).toBeTruthy();
  }));
});
