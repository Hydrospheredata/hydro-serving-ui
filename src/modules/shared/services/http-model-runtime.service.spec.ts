import { TestBed, inject } from '@angular/core/testing';

import { HttpModelRuntimeService } from './http-model-runtime.service';
import { ModelBuilder } from '@shared/builders/_index';
import { HttpService } from './http.service';
describe('HttpModelRuntimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpModelRuntimeService,
        { provide: HttpService, useValue: {} },
        { provide: ModelBuilder, useValue: {} }
      ]
    });
  });

  it('should be created', inject([HttpModelRuntimeService], (service: HttpModelRuntimeService) => {
    expect(service).toBeTruthy();
  }));
});
