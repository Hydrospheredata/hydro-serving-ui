import { TestBed, inject } from '@angular/core/testing';

import { ModelRuntimeStore } from './model-runtime.store';
import { HttpModelServiceService, BuildModelService } from '@shared/services/_index';

describe('ModelRuntimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelRuntimeStore, { provide: HttpModelServiceService, useValue: {} }, { provide: BuildModelService, useValue: {} }]
    });
  });

  it('should be created', inject([ModelRuntimeStore], (service: ModelRuntimeStore) => {
    expect(service).toBeTruthy();
  }));
});
