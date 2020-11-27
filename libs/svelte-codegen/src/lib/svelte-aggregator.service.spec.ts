import { TestBed } from '@angular/core/testing';

import { SvelteAggregatorService } from './svelte-aggregator.service';

describe('SvelteAggregatorService', () => {
  let service: SvelteAggregatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvelteAggregatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
