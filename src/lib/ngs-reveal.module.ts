import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealService } from './ngs-reveal.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NGS_REVEAL_DIRECTIVES } from './ngs-reveal.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NGS_REVEAL_DIRECTIVES],
  declarations: [NGS_REVEAL_DIRECTIVES]
})
export class NgsRevealModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgsRevealModule,
      providers: [NgsRevealConfig, NgsRevealService]
    };
  }
}
