import { TestBed, inject } from '@angular/core/testing';
import { ModelStore } from './model.store';
import { HttpModelsService } from '../services/http-models.service';
import { HttpService } from '../services/http.service';

describe('ModelStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelStore, HttpModelsService, HttpService]
    });
  });

  it('should be created', inject([ModelStore], (service: ModelStore) => {
    expect(service).toBeTruthy();
  }));
});
