import { TestBed } from '@angular/core/testing';

import { AggregationDetailsService } from './aggregation-details.service';

describe('AggregationDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AggregationDetailsService = TestBed.get(AggregationDetailsService);
    expect(service).toBeTruthy();
  });
});
