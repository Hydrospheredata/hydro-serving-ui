import { TestBed, inject } from '@angular/core/testing';

import { DataStore } from './data.store';

describe('DataStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataStoreService]
    });
  });

  it('should be created', inject([DataStore], (service: DataStore) => {
    expect(service).toBeTruthy();
  }));
});
