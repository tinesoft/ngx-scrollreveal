import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService, NgsRevealService, NgsRevealConfig } from './services/index';
import { NgsRevealDirective, NgsRevealSetDirective } from './directives/index';

export { WindowService, NgsRevealService, NgsRevealConfig } from './services/index';

export { NgsRevealDirective, NgsRevealSetDirective } from './directives/index';

/**
 * Main module of the library
 */
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NgsRevealDirective, NgsRevealSetDirective],
  declarations: [NgsRevealDirective, NgsRevealSetDirective]
})
export class NgsRevealModule {
}
