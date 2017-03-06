import { Directive, HostBinding, OnInit, ElementRef, Input } from '@angular/core';
import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealService } from './ngs-reveal.service';
import { AbstractNgsRevealDirective } from './ngs-reveal-common';

/**
 * Directive to add 'ScrollReveal' functionality to a <b>single DOM element</b> in the page.
 */
@Directive({
    selector: '[ngsReveal]'
})
export class NgsRevealDirective extends AbstractNgsRevealDirective implements OnInit {

    @HostBinding('style.visibility')
    visibility = 'hidden';

    /**
     * Custom configuration to use when revealing this element
     */
    @Input('ngsReveal')
    set _config(value: string | NgsRevealConfig) {
        this._initConfig(value);
    }

    constructor(private elementRef: ElementRef, ngsRevealService: NgsRevealService) {
        super(ngsRevealService);
    }

    ngOnInit() {
        this.ngsRevealService.reveal(this.elementRef, this.config);
    }
}
