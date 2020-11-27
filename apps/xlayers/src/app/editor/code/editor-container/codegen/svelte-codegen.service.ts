import { Injectable } from '@angular/core';
import { SketchMSData } from '@xlayers/sketchtypes';
import {
  SvelteCodegenService,
  SvelteDocgenService,
} from '@xlayers/svelte-codegen';

@Injectable({
  providedIn: 'root',
})
export class SvelteCodeGenFacadeService {
  constructor(
    private readonly svelteCodeGen: SvelteCodegenService,
    private readonly svelteDocGen: SvelteDocgenService
  ) {}

  buttons() {
    return {
      stackblitz: true,
    };
  }

  generate(data: SketchMSData) {}
}
