import { Injectable, ElementRef } from '@angular/core';
import { NgsRevealConfig } from './ngs-reveal-config';
import { WindowService } from './window.service';
import { Subject, Observable } from 'rxjs';

/**
 * Type that represents the target that can be passed to `ScrollReveal().reveal()`.
 */
export type NgsRevealTarget = string | HTMLElement | HTMLCollection | Array<any>;

/**
 * Basic interface to represent `ScrollReveal` object.
 */
export interface NgsScrollReveal {
  /**
   * Controls whether or not to output help messages to the console when unexpected things occur at runtime.
   */
  debug?: boolean;
  /**
   * When `ScrollReveal` is instantiated on unsupported or disabled browsers,
   * a non-operational instance is created with a `noop` property that returns `true`
   */
  noop: boolean;
  /**
   * Returns the version of `ScrollReveal` currently loaded on the page.
   */
  version?: string;
  /**
   * When non-resetting reveal animations complete, `ScrollReveal` will remove that elements event listeners, generated styles and metadata.
   * In some cases (such as asynchronous sequences), you may not want this behavior.
   * @param target the related element
   */
  clean(target: NgsRevealTarget): void;
  /**
   * Reverses the effects of all `reveal()` calls, removing all generated styles and event listeners, and clears the `ScrollReveal` store.
   */
  destroy(): void;
  /**
   * Invokes all previous `reveal()` calls (with the appropriate arguments), to capture any new elements added to the DOM.
   */
  sync(): void;
  /**
   * Registers the target element(s) with ScrollReveal, generates animation styles,
   * and attaches event listeners to manage when styles are applied.
   * @param target element to reveal
   * @param options optionbs to use to reveal
   * @param syncing whether or not to sync newly added elements (through an asyn call for e.g) with DOM
   */
  reveal(target: NgsRevealTarget, options?: NgsRevealConfig, syncing?: boolean): void;

  isSupported(): boolean;
}

/**
 * The function that returns the `ScrollReveal` instance.
 * @param options Options to use instead of the defaults.
 */
declare function ScrollReveal(options?: NgsRevealConfig): NgsScrollReveal;

/**
 * Marker interface to indicate that an object (typically `window`) has `scrollreveal` property.
 */
export interface NgsHasScrollReveal {
  scrollReveal: NgsScrollReveal;
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
  private sr: NgsScrollReveal;

  // Window Object
  private window: Window & NgsHasScrollReveal;
  private config: NgsRevealConfig;


   // Observable  sources
  private beforeRevealSource: Subject<HTMLElement>;
  private afterRevealSource: Subject<HTMLElement>;
  private beforeResetSource: Subject<HTMLElement>;
  private afterResetSource: Subject<HTMLElement>;

   /**
    * Observable to subscribe to and get notified before an element is revealed.
    */
   beforeReveal$: Observable<HTMLElement>;
   /**
    * Observable to subscribe to and get notified after an element is revealed.
    */
   afterReveal$: Observable<HTMLElement>;
   /**
    * Observable to subscribe to and get notified before an element is reset.
    */
   beforeReset$: Observable<HTMLElement>;
   /**
    * Observable to subscribe to and get notified after an element is reset.
    */
   afterReset$: Observable<HTMLElement>;

  constructor(config: NgsRevealConfig, windowService: WindowService) {
     // Observable  sources
     this.beforeRevealSource = new Subject<HTMLElement>();
     this.afterRevealSource = new Subject<HTMLElement>();
     this.beforeResetSource = new Subject<HTMLElement>();
     this.afterResetSource = new Subject<HTMLElement>();

     // Observable  streams
    this.beforeReveal$ = this.beforeRevealSource.asObservable();
    this.afterReveal$ = this.afterRevealSource.asObservable();
    this.beforeReset$ = this.beforeResetSource.asObservable();
    this.afterReset$ = this.afterResetSource.asObservable();

    this.window = windowService.nativeWindow;
    this.init(config);
  }

  /**
   * Initializes Cookie Consent with the provided configuration.
   * @param config the configuration object
   */
  init(config: NgsRevealConfig): void {
    if (this.window) {// universal support
      this.config = config;

      // Set callbacks hooks:
      this.config.beforeReveal = (el: HTMLElement) => this.beforeRevealSource.next(el);
      this.config.afterReveal = (el: HTMLElement) => this.afterRevealSource.next(el);
      this.config.beforeReset = (el: HTMLElement) => this.beforeResetSource.next(el);
      this.config.afterReset = (el: HTMLElement) => this.afterResetSource.next(el);

      // init the scrollReveal library with injected config
      this.sr = ScrollReveal(config);
    }
  }

    /**
   * Gets the current configuration  used by ScrollReveal.
   */
  getConfig(): NgsRevealConfig {
    return this.config;
  }

  /**
   * Method to reveal a single DOM element.
   * @param elementRef  a reference to the element to reveal
   * @param config      (optional) custom configuration to use when revealing this element
   */
  reveal(elementRef: ElementRef<HTMLElement>, config?: NgsRevealConfig): void {
    if (this.window && elementRef.nativeElement) {
      this.sr.reveal(elementRef.nativeElement, config);
    }
  }

  /**
   * Method to reveal a set of DOM elements.
   * @param parentElementRef  the parent DOM element encaspulating the child elements to reveal
   * @param selector          a list of CSS selectors (comma-separated) that identifies child elements to reveal
   * @param interval          (optional) interval in milliseconds, to animate child elemnts sequentially
   * @param config            (optional) custom configuration to use when revealing this set of elements
   */
  revealSet(parentElementRef: ElementRef<HTMLElement>, selector: string, interval?: number, config?: NgsRevealConfig): void {
    if (this.window && parentElementRef.nativeElement) {
      const options = { ...config, interval: interval};
      this.sr.reveal(selector, options);
    }
  }

  /**
   * Method to synchronize and consider newly added child elements (for e.g when child elements were added asynchronously to parent DOM) .
   */
  sync(): void {
    if (this.window) {// universal support
      this.sr.sync();
    }
  }

  /**
   * Reverses the effects of all `reveal()` calls, removing all generated styles and event listeners, and clears the `ScrollReveal` store.
   */
  destroy(): void {
    if (this.window) {
      this.sr.destroy();
    }
  }

}
