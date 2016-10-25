import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealService } from './ngs-reveal.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgsRevealDirective } from './ngs-reveal.directive';
import { NgsRevealSetDirective } from './ngs-reveal-set.directive';
import { CommonModule } from '@angular/common';

export const NGS_REVEAL_DIRECTIVES = [NgsRevealDirective, NgsRevealSetDirective];


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
