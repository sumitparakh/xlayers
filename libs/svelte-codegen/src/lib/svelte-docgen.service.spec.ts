import { TestBed } from '@angular/core/testing';

import { SvelteDocgenService } from './svelte-docgen.service';

describe('SvelteDocgenService', () => {
  let service: SvelteDocgenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvelteDocgenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
