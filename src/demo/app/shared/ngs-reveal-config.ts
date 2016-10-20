import { Injectable } from '@angular/core';

/**
 * Configuration service for the NgScrollReveal directives.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ngsReveal directives used in the application.
 */
@Injectable()
export class NgsRevealConfig {
    // 'bottom', 'left', 'top', 'right'
    origin?: 'bottom' | 'left' | 'top' | 'right' = 'bottom';

    // Can be any valid CSS distance, e.g. '5rem', '10%', '20vw', etc.
    distance?= '20px';

    // Time in milliseconds.
    duration?= 500;
    delay?= 0;

    // Starting angles in degrees, will transition from these values to 0 in all axes.
    rotate?= { x: 0, y: 0, z: 0 };

    // Starting opacity value, before transitioning to the computed opacity.
    opacity?= 0;

    // Starting scale value, will transition from this value to 1
    scale?= 0.9;

    // Accepts any valid CSS easing, e.g. 'ease', 'ease-in-out', 'linear', etc.
    easing?= 'cubic-bezier(0.6, 0.2, 0.1, 1)';

    // `<html>` is the default reveal container. You can pass either:
    // DOM Node, e.g. document.querySelector('.fooContainer')
    // Selector, e.g. '.fooContainer'
    container?: HTMLDocument;

    // true/false to control reveal animations on mobile.
    mobile?= true;

    // true:  reveals occur every time elements become visible
    // false: reveals occur once as elements become visible
    reset?= false;

    // 'always' — delay for all reveal animations
    // 'once'   — delay only the first time reveals occur
    // 'onload' - delay only for animations triggered by first load
    useDelay?: 'always' | 'once' | 'onload' = 'always';

    // Change when an element is considered in the viewport. The default value
    // of 0.20 means 20% of an element must be visible for its reveal to occur.
    viewFactor?= 0.2;

    // Pixel values that alter the container boundaries.
    // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
    // --
    // Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png
    viewOffset?= { top: 0, right: 0, bottom: 0, left: 0 };
}
