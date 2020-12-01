import { TestBed } from '@angular/core/testing';

import { ExportStackblitzSvelteService } from './stackblitz.svelte.service';

describe('Stackblitz.SvelteService', () => {
  let service: ExportStackblitzSvelteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportStackblitzSvelteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
