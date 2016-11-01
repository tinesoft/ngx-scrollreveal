import { Directive, OnInit, OnChanges, SimpleChange, ElementRef, Input } from '@angular/core';
import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealService } from './ngs-reveal.service';
import { AbstractNgsRevealDirective } from './ngs-reveal-common';


/**
 * Directive to add 'ScrollReveal' functionality to a <b>set of DOM elements</b> (identify via the `[ngsSelector]` attribute) in the page.
 * This directive is meant to be placed on the <b>parent node</b> that contains the child elements to reveal.
 * You can optionally add the `[ngsInterval]` attribute to reveal items sequentially, following the given interval(in milliseconds).
 * You can optionally add the `[ngsSync]` attribute to reveal new child elements that may have been added in the parent node asynchronously.
 * 
 */
@Directive({
    selector: '[ngsRevealSet]'
})
export class NgsRevealSetDirective extends AbstractNgsRevealDirective implements OnInit, OnChanges {

    /**
     * Custom configuration to use when revealing this set of elements 
     */
    @Input('ngsRevealSet')
    set _config(value: string | NgsRevealConfig) {
        this._initConfig(value);
    }

    /**
     * CSS selector to identify child elements to reveal
     */
    @Input('ngsSelector')
    selector: string;

    /**
     * Sequence interval (in milliseconds) to the reveal child elements sequentially
     */
    @Input('ngsInterval')
    interval: number;

    /**
     * Boolean indicating when the set should be synced, to reveal asynchronously added child elements
     */
    @Input('ngsSync')
    sync: boolean;

    constructor(private elementRef: ElementRef, ngsRevealService: NgsRevealService) {
        super(ngsRevealService);
    }

    ngOnInit() {
        if (!this.selector && console) {
            let item: string = this.elementRef.nativeElement ? this.elementRef.nativeElement.className : '';
            console.error(`[ng2-scrollreveal] You must set "[ngsSelector]" attribute on item '${item}' when using "ngsRevealSet"`);
            return;
        }
        this.ngsRevealService.revealSet(this.elementRef, this.selector, this.interval, this.config);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {

        let ngsSyncProp = 'ngsSync';
        if (ngsSyncProp in changes
            && !changes[ngsSyncProp].isFirstChange()
            && !changes[ngsSyncProp].currentValue()) {
            this.ngsRevealService.sync();
        }
    }
}
