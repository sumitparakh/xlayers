import { Injectable } from '@angular/core';
import { AngularCodeGenFacadeService } from './angular-codegen.service';
import { ReactCodeGenFacadeService } from './react-codegen.service';
import { VueCodeGenFacadeService } from './vue-codegen.service';
import { WebComponentCodeGenFacadeService } from './web-component-codegen.service';
import { StencilCodeGenFacadeService } from './stencil-codegen.service';
import { LitElementCodeGenFacadeService } from './lit-element-codegen.service';
import { XamarinCodeGenService } from './xamarin-codegen.service';
import { Store } from '@ngxs/store';
import { AngularElementCodeGenFacadeService } from './angular-element-codegen.service';
import { SvelteCodeGenFacadeService } from './svelte-codegen.service';
import { UiState } from '../../../../core/state';
import { environment } from '../../../../../environments/environment';
import { CodeGenSettings } from '../../../../core/state/page.state';
import { SketchMSLayer, SketchMSData } from '@xlayers/sketchtypes';

declare var gtag;

export interface XlayersNgxEditorModel {
  kind:
    | 'png'
    | 'angular'
    | 'angularElement'
    | 'react'
    | 'vue'
    | 'wc'
    | 'stencil'
    | 'litElement'
    | 'html'
    | 'text'
    | 'xamarinForms'
    | 'svelte';
  uri: string;
  value: any;
  language: string;
}

export interface XlayersExporterNavBar {
  stackblitz?: boolean;
}

export interface CodeGenFacade {
  buttons(): XlayersExporterNavBar;
  generate(ast: SketchMSLayer): Array<XlayersNgxEditorModel>;
}

export enum CodeGenKind {
  Unknown,
  Angular,
  AngularElement,
  React,
  Vue,
  WC,
  Stencil,
  LitElement,
  XamarinForms,
  Svelte,
}

@Injectable({
  providedIn: 'root',
})
export class CodeGenService {
  private data: SketchMSData;
  private ast: SketchMSLayer;

  constructor(
    private readonly angular: AngularCodeGenFacadeService,
    private readonly angularElement: AngularElementCodeGenFacadeService,
    private readonly react: ReactCodeGenFacadeService,
    private readonly vue: VueCodeGenFacadeService,
    private readonly wc: WebComponentCodeGenFacadeService,
    private readonly stencil: StencilCodeGenFacadeService,
    private readonly litElement: LitElementCodeGenFacadeService,
    private readonly xamarinForms: XamarinCodeGenService,
    private readonly svelte: SvelteCodeGenFacadeService,
    private readonly store: Store
  ) {
    this.store
      .select(UiState.currentPage)
      .subscribe((currentData: SketchMSLayer) => {
        this.ast = currentData;
      });

    this.store
      .select(UiState.currentData)
      .subscribe((currentData: SketchMSData) => {
        if (currentData) {
          this.data = currentData;
        }
      });
  }

  private addHeaderInfo(content: Array<XlayersNgxEditorModel>) {
    return content.map((file) => {
      const message = 'File auto-generated by xLayers.app';
      const version = `Build: ${environment.version}`;
      const date = `Date: ${new Date().toLocaleString()}`;
      const comment = {
        start: '//',
        end: '',
      };
      if (
        file.language.includes('html') ||
        file.language.includes('xaml') ||
        file.language.includes('xml')
      ) {
        comment.start = '<!--';
        comment.end = '-->';
      } else if (file.language.includes('css')) {
        comment.start = '/*';
        comment.end = '*/';
      }

      if (file.language.includes('xaml')) {
        const temp = file.value.trim().split('\n');
        file.value = [
          temp.shift(),
          `${comment.start} ${message} ${comment.end}`,
          `${comment.start} ${version} ${comment.end}`,
          `${comment.start} ${date} ${comment.end}`,
          '',
          ...temp,
        ].join('\n');
      } else if (file.language !== 'base64') {
        file.value = [
          `${comment.start} ${message} ${comment.end}`,
          `${comment.start} ${version} ${comment.end}`,
          `${comment.start} ${date} ${comment.end}`,
          '',
          file.value,
        ].join('\n');
      }

      return file;
    });
  }

  trackFrameworkKind(kind: CodeGenKind) {
    gtag('event', 'code_gen', {
      event_category: 'web',
      event_label: kind,
    });
  }

  generate(kind: CodeGenKind): CodeGenSettings {
    switch (kind) {
      case CodeGenKind.Angular:
        this.trackFrameworkKind(CodeGenKind.Angular);
        return {
          kind,
          content: this.addHeaderInfo(this.angular.generate(this.data)),
          buttons: this.angular.buttons(),
        };

      case CodeGenKind.AngularElement:
        this.trackFrameworkKind(CodeGenKind.AngularElement);
        return {
          kind,
          content: this.addHeaderInfo(this.angularElement.generate(this.data)),
          buttons: this.angularElement.buttons(),
        };

      case CodeGenKind.React:
        this.trackFrameworkKind(CodeGenKind.React);
        return {
          kind,
          content: this.addHeaderInfo(this.react.generate(this.data)),
          buttons: this.react.buttons(),
        };

      case CodeGenKind.Vue:
        this.trackFrameworkKind(CodeGenKind.Vue);
        return {
          kind,
          content: this.addHeaderInfo(this.vue.generate(this.data)),
          buttons: this.vue.buttons(),
        };

      case CodeGenKind.WC:
        this.trackFrameworkKind(CodeGenKind.WC);
        return {
          kind,
          content: this.addHeaderInfo(this.wc.generate(this.data)),
          buttons: this.wc.buttons(),
        };

      case CodeGenKind.Stencil:
        this.trackFrameworkKind(CodeGenKind.Stencil);
        return {
          kind,
          content: this.addHeaderInfo(this.stencil.generate(this.data)),
          buttons: this.stencil.buttons(),
        };

      case CodeGenKind.LitElement:
        return {
          kind,
          content: this.addHeaderInfo(this.litElement.generate(this.data)),
          buttons: this.litElement.buttons(),
        };

      case CodeGenKind.XamarinForms:
        return {
          kind,
          content: this.addHeaderInfo(this.xamarinForms.generate(this.ast)),
          buttons: this.xamarinForms.buttons(),
        };
      case CodeGenKind.Svelte:
        return {
          kind,
          content: this.addHeaderInfo(this.svelte.generate(this.data)),
          buttons: this.svelte.buttons(),
        };
    }
  }
}
