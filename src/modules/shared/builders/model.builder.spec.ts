import { TestBed, inject } from '@angular/core/testing';

import { ModelBuilder } from './model.builder';

describe('ModelBuilder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelBuilder]
    });
  });

  // it('should be created', inject([ModelBuilder], (service: ModelBuilder) => {
  //   expect(service).toBeTruthy();
  // }));
});
