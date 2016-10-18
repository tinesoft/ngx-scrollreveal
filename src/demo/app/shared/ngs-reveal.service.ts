/// <reference path="../../../../node_modules/@types/scrollreveal/index.d.ts"/>
import { NgsRevealConfig } from './ngs-reveal-config';
import { WindowRef } from './window-ref';
import { Injectable, ElementRef, QueryList } from '@angular/core';

/**
 * Service to inject in directives to use ScrollReveal JS. 
 * It delegates the work to SR, when DOM manipulation is possible (i.e app is not running in a web worker for example) 
 * Otherwise, we most methods simply do nothing, as DOM elements are not available.
 */
@Injectable()
export class NgsRevealService {

  sr: scrollReveal.ScrollRevealObject;

  constructor(config: NgsRevealConfig) {
    //init the scrollReveal library with injected config
    let srConfig: scrollReveal.ScrollRevealObjectOptions = Object.assign({}, config || {});
    this.sr = ScrollReveal(srConfig);
   }
  
  reveal(elementRef: ElementRef, config?: NgsRevealConfig ): scrollReveal.ScrollRevealObject {
    return elementRef.nativeElement ? // can be null, if app is running in a web worker for i.e 
      this.sr.reveal(elementRef.nativeElement, config) : this.sr;
  }

  revealSet(parentElementRef: ElementRef, selector: string, interval?: number, config?: NgsRevealConfig ): scrollReveal.ScrollRevealObject {
    if(parentElementRef.nativeElement){// can be null, if app is running in a web worker for i.e 
      //merge config from user (if any) and force 'container' to be the parent element
      let srConfig: scrollReveal.ScrollRevealObjectOptions = Object.assign({ container : parentElementRef.nativeElement }, config || {});      
      return this.sr.reveal(selector, config, interval) ;
    }
    else {
      return this.sr;
    }
  }

  sync() : void {
     this.sr.sync();
   }

}
