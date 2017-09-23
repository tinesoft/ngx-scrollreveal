import { Injectable, ElementRef } from '@angular/core';
import { NgsRevealConfig } from './ngs-reveal-config';
import { WindowService } from './window.service';


/**
 * Marker interface to indicate that an object (typically `window`) has `scrollreveal` property.
 */
export interface NgsHasScrollreveal {
  scrollReveal: scrollReveal.ScrollRevealObject;
}

/**
 * Service to inject in directives to use ScrollReveal JS.
 * It delegates the work to SR, when DOM manipulation is possible (i.e app is not running in a web worker for e.g).
 * If not possible, most methods simply do nothing, as DOM elements are not available anyway.
 */
@Injectable()
export class NgsRevealService {

  // the Magic Maker !
  // this objet is added to window scope when linking the scrollreveal.js library
  private sr: scrollReveal.ScrollRevealObject;

  // Window Object
  private window: Window & NgsHasScrollreveal;


  constructor(private config: NgsRevealConfig, private windowService: WindowService) {
    this.window = windowService.nativeWindow;

    if (this.window) {// universal support
      // init the scrollReveal library with injected config
      let srConfig: scrollReveal.ScrollRevealObjectOptions = Object.assign({}, config || {});
      this.sr = ScrollReveal(srConfig);
    }
  }

  /**
   * Method to reveal a single DOM element.
   * @param elementRef  a reference to the element to reveal
   * @param config      (optional) custom configuration to use when revealing this element
   */
  reveal(elementRef: ElementRef, config?: NgsRevealConfig): scrollReveal.ScrollRevealObject {
    if (!this.window) {// universal support
      return null;
    }
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
  revealSet(parentElementRef: ElementRef, selector: string, interval?: number, config?: NgsRevealConfig): scrollReveal.ScrollRevealObject {
    if (!this.window) {// universal support
      return null;
    }
    return parentElementRef.nativeElement ? // can be null, if app is running in a web worker for i.e
      this.sr.reveal(selector, config, interval) : this.sr;
  }

  /**
   * Method to synchronize and consider newly added child elements (for e.g when child elements were added asynchronously to parent DOM) .
   */
  sync(): void {
    if (this.window) {// universal support
      this.sr.sync();
    }
  }

}
