import { TestBed, inject } from '@angular/core/testing';
import { ModelStore } from './model.store';
import { HttpModelsService, BuildModelService } from '@shared/services/_index';
import { HttpService } from '../services/http.service';

describe('ModelStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelStore, { provide: HttpModelsService, useValue: {} }, { provide: BuildModelService, useValue: {} }]
    });
  });

  it('should be created', inject([ModelStore], (service: ModelStore) => {
    expect(service).toBeTruthy();
  }));
});
