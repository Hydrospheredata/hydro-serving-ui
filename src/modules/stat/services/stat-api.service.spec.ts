import { TestBed } from '@angular/core/testing';

import { StatApiService } from './stat-api.service';

describe('StatApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatApiService = TestBed.get(StatApiService);
    expect(service).toBeTruthy();
  });
});
