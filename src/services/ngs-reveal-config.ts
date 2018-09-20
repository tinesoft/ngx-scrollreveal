import { Injectable } from '@angular/core';

/**
 * Configuration service for the NgsScrollReveal directives.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ngsReveal directives used in the application.
 */
@Injectable({
    providedIn: 'root',
})
export class NgsRevealConfig {

    ///////////////////////
    // Animation options //
    ///////////////////////

    /**
     * `options.delay` is the time before reveal animations begin.
     * By default, delay will be used for all reveal animations,
     * but `options.useDelay` can be used to change when delay is applied.
     * However, animations triggered by `options.reset` will never use delay.
     */
    delay?= 0;
    /**
     * `options.distance` controls how far elements move when revealed.
     */
    distance?= '0px';
    /**
     * `options.duration` controls how long animations take to complete.
     */
    duration?= 600;
    /**
     * `options.easing` controls how animations transition between their start and end values.
     * Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
     */
    easing?= 'cubic-bezier(0.5, 0, 0, 1)';
    /**
     * `options.interval` is the time between each reveal.
     */
    interval?= 0;
    /**
     * `options.opacity` specifies the opacity they have prior to being revealed.<br/>
     */
    opacity?= 0;
    /**
     * `options.origin` specifies what direction elements come from when revealed.
     */
    origin?: 'bottom' | 'left' | 'top' | 'right' = 'bottom';
    /**
     * `options.rotate` specifies the rotation elements have prior to being revealed.
     */
    rotate?= { x: 0, y: 0, z: 0 };
    /**
     * `options.scale` specifies the size of elements have prior to being revealed.
     */
    scale?= 0.9;

    ////////////////////
    // Config options //
    ////////////////////

    /**
     * When non-resetting reveal animations complete, `ScrollReveal` will remove that elements event listeners,
     * generated styles and metadata. In some cases (such as asynchronous sequences), you may not want this behavior.
     */
    cleanup?= false;
    /**
     * `options.container` is used as the viewport, when determining element visibility.
     * This is the element that ScrollReveal binds event listeners to.
     */
    container?: Element | string;
    /**
     * `options.desktop` enables/disables animations on desktop browsers.
     */
    desktop?= true;
    /**
     * `options.mobile` enables/disables animations on mobile browsers.
     */
    mobile?= true;
    /**
     * `options.reset` enables/disables elements returning to their initialized position when they leave the viewport.
     * When true elements reveal each time they enter the viewport instead of once.
     */
    reset?= false;
    /**
     * `options.useDelay` specifies when values assigned to options.delay are used.
     *
     * - 'always' — delay for all reveal animations
     * - 'once'   — delay only the first time reveals occur
     * - 'onload' - delay only for animations triggered by first load
     */
    useDelay?: 'always' | 'once' | 'onload' = 'always';
    /**
     * `options.viewFactor` specifies what portion of an element must be within the viewport for it to be considered visible.
     */
    viewFactor?= 0.2;
    /**
     * `options.viewOffset` expands/contracts the active boundaries of the viewport when calculating element visibility.
     *
     * Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
     */
    viewOffset?= { top: 0, right: 0, bottom: 0, left: 0 };

    //////////////////////
    // Callback options //
    //////////////////////

    /**
     * `options.beforeReveal` is a function that fires when a reveal is triggered.
     */
    beforeReveal?: (el: HTMLElement) => void;
    /**
     * `options.afterReveal` is a function that fires upon reveal completion.
     */
    afterReveal?: (el: HTMLElement) => void;
    /**
     * `options.beforeReset` is a function that fires when a reset is triggered.
     */
    beforeReset?: (el: HTMLElement) => void;
    /**
     * `options.afterReset` is a function that fires upon reset completion.Callback to call after an element is reset.
     */
    afterReset?: (el: HTMLElement) => void;
}
