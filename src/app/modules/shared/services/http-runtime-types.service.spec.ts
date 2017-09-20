import { TestBed, inject } from '@angular/core/testing';

import { HttpRuntimeTypesService } from './http-runtime-types.service';

describe('HttpRuntimeTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpRuntimeTypesService]
    });
  });

  it('should be created', inject([HttpRuntimeTypesService], (service: HttpRuntimeTypesService) => {
    expect(service).toBeTruthy();
  }));
});
