import { TestBed, inject } from '@angular/core/testing';

import { HttpModelRuntimeService } from './http-model-runtime.service';

describe('HttpModelRuntimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpModelRuntimeService]
    });
  });

  it('should be created', inject([HttpModelRuntimeService], (service: HttpModelRuntimeService) => {
    expect(service).toBeTruthy();
  }));
});
