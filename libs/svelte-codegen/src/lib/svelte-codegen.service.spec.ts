import { TestBed } from '@angular/core/testing';

import { SvelteCodegenService } from './svelte-codegen.service';

describe('SvelteCodegenService', () => {
  let service: SvelteCodegenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvelteCodegenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
