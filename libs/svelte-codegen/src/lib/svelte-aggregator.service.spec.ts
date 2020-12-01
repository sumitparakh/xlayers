import { TestBed } from '@angular/core/testing';
import { FormatService } from '@xlayers/sketch-lib';
import { SketchMSLayer } from '@xlayers/sketchtypes';
import { WebCodeGenService } from '@xlayers/web-codegen';

import { SvelteAggregatorService } from './svelte-aggregator.service';

describe('SvelteAggregatorService', () => {
  let service: SvelteAggregatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SvelteAggregatorService,
        {
          provide: FormatService,
          useValue: {
            normalizeName: () => 'abc',
            className: (name: string) => name,
            indentFile: (n: number, contents: string) => [contents],
          },
        },
        {
          provide: WebCodeGenService,
          useValue: {
            context: (current: SketchMSLayer) => current,
            aggregate: () => [
              {
                kind: 'svelte',
                value: '<span></span>',
                language: 'html',
                uri: 'components/page-1.svelte',
              },
            ],
          },
        },
      ],
    });
    service = TestBed.inject(SvelteAggregatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
