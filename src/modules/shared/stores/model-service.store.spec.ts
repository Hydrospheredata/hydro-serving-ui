import { TestBed, inject } from '@angular/core/testing';

import { ModelServiceStore } from './model-service.store';
import { HttpModelServiceService } from '@shared/services/_index';

describe('ModelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelServiceStore, { provide: HttpModelServiceService, useValue: {} }]
    });
  });

  it('should be created', inject([ModelServiceStore], (service: ModelServiceStore) => {
    expect(service).toBeTruthy();
  }));
});
