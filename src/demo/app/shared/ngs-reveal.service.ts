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
  
  /**
   * Method to reveal a single DOM element.
   * @param elementRef  a reference to the element to reveal
   * @param config      (optional) custom configuration to use when revealing this element
   */
  reveal(elementRef: ElementRef, config?: NgsRevealConfig ): scrollReveal.ScrollRevealObject {
    return elementRef.nativeElement ? // can be null, if app is running in a web worker for i.e 
      this.sr.reveal(elementRef.nativeElement, config) : this.sr;
  }

  /**
   * Method to reveal a set of DOM elements.
   * @param parentElementRef  the parent DOM element encaspulating the child elements to reveal
   * @param selector          a list of CSS selectors (comma-separated) that identifies child elements to reveal
   * @param interval          (optional) interval in milliseconds, to animate child elemnts sequentially
   * @param config            (optional) custom configuration to use when revealing this set of elements
   */
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

  /**
   * Method to synchronize and consider newly added child elements (for e.g when child elements were added asynchronously to parent DOM) 
   */
  sync() : void {
     this.sr.sync();
   }

}
