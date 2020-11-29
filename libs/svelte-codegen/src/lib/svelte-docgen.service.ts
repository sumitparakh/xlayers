import { Injectable } from '@angular/core';
import { SketchMSData } from '@xlayers/sketchtypes';

@Injectable({
  providedIn: 'root',
})
export class SvelteDocgenService {
  constructor() {}

  aggregate(data: SketchMSData) {
    return [
      {
        uri: 'README.md',
        value: this.renderReadme(data.meta.app),
        language: 'markdown',
        kind: 'text',
      },
    ];
  }

  private renderReadme(name: string) {
    return `\
## How to use the ${name} Svelte module

1. Download and extract the exported module into your workspace,

    `;
  }
}
