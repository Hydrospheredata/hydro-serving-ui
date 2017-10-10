import { TestBed, inject } from '@angular/core/testing';

import { HttpModelsService } from './http-models.service';
import { ModelBuilder, ModelBuildBuilder } from '@shared/builders/_index';
import { HttpService } from './http.service';
describe('HttpModelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpModelsService,
        { provide: HttpService, useValue: {} },
        { provide: ModelBuildBuilder, useValue: {} },
        { provide: ModelBuilder, useValue: {} }
      ]
    });
  });

  it('should be created', inject([HttpModelsService], (service: HttpModelsService) => {
    expect(service).toBeTruthy();
  }));
});
