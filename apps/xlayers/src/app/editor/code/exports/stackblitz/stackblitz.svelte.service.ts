import { Injectable } from '@angular/core';
import { XlayersNgxEditorModel } from '../../editor-container/codegen/codegen.service';
import { StackBlitzProjectPayload } from './stackblitz.service';

@Injectable({
  providedIn: 'root',
})
export class ExportStackblitzSvelteService {
  prepare(content: XlayersNgxEditorModel[]): StackBlitzProjectPayload {
    const files = {};
    for (let i = 0; i < content.length; i++) {
      for (const prop in content[i]) {
        if (prop === 'uri') {
          files[content[i].uri] = content[i].value;
        }
      }
    }

    files['index.html'] = `<div id="root"></div>`;
    files['index.js'] = `\

import App from "./components/page-1.svelte";

const app = new App({
  target: document.querySelector("#root"),
  data: {}
}); 
    
    `;

    return {
      files,
      template: 'javascript',
      tags: ['svelte'],
    };
  }
}
