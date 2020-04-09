import { TestBed } from '@angular/core/testing';

import { StatService } from './stat.service';

describe('StatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatService = TestBed.get(StatService);
    expect(service).toBeTruthy();
  });
});
