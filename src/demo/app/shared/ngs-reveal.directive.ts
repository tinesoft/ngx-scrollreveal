import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealService } from './ngs-reveal.service';
import { Directive, OnInit, OnChanges, SimpleChange, ElementRef, Input } from '@angular/core';

/**
 * Base directive class shared by the concrete ScrollReveal directives.
 */
abstract class AbstractNgsRevealDirective {

    protected config: NgsRevealConfig;

    constructor(protected ngsRevealService: NgsRevealService) { }

    protected _initConfig (value: string | NgsRevealConfig): void{
        if(value && typeof value === "string"){
            this.config = JSON.stringify(value);
        }
        else if(value && typeof value === "object"){
            this.config = value;
        }
    }
}

/**
 * Directive to add 'ScrollReveal' functionality to a <b>single DOM element</b> in the page.
 * This directive automatically sets the element's visibility to `hidden` to avoid any flickering issue that may occur when ScrollReveal.js kicks in. 
 */
@Directive({
    selector: '[ngsReveal]',
    host: {
        '[style.visibility]': 'hidden'
    }
})
export class NgsRevealDirective extends AbstractNgsRevealDirective implements OnInit {

    /**
     * Custom configuration to use when revealing this element
     */
    @Input("ngsReveal")
    set _config (value: string | NgsRevealConfig){
        this._initConfig(value)
    }
    
    constructor(private elementRef: ElementRef, ngsRevealService: NgsRevealService) {
        super(ngsRevealService);
     }

    ngOnInit() { 
        this.ngsRevealService.reveal(this.elementRef, this.config);
    }
}

/**
 * Directive to add 'ScrollReveal' functionality to a <b>set of DOM elements</b> (identify via the `[ngsSelector]` attribute) in the page.
 * This directive is meant to be placed on the <b>parent node</b> that contains the child elements to reveal.
 * You can optionally add the `[ngsInterval]` attribute to reveal items sequentially, following the given interval of time.
 * You can optionally add the `[ngsSync]` attribute to auto-sync (and reveal) new child elements that may have been added in the parent node asynchronously.
 * 
 */
@Directive({
    selector: '[ngsRevealSet]'
})
export class NgsRevealSetDirective extends AbstractNgsRevealDirective  implements OnInit, OnChanges  {

    /**
     * Custom configuration to use when revealing this set of elements 
     */
    @Input("ngsRevealSet")
    set _config (value: string | NgsRevealConfig){
        this._initConfig(value)
    }

    /**
     * CSS selector to identify child elements to reveal
     */
    @Input("ngsSelector")
    selector:string;

    /**
     * Sequence interval (in milliseconds) to the reveal child elements sequentially
     */
    @Input("ngsInterval")
    interval:number;

    /**
     * Boolean indicating when the set should be synced, to reveal asynchronously added child elements
     */
    @Input("ngsSync")
    sync: boolean;

    constructor(private elementRef: ElementRef, ngsRevealService: NgsRevealService) {
        super(ngsRevealService);
     }

    ngOnInit() { 
        if(!this.selector && console){
            console.error("[ngsScrollReveal] You must specify '[ngsSelector]' attribute when using ngsRevealSet directive");
            return;
        }
        this.ngsRevealService.revealSet(this.elementRef, this.selector, this.interval,this.config);
    }

    ngOnChanges( changes: {[propertyName: string]: SimpleChange}){

        let ngsSyncProp = "ngsSync";
        if(ngsSyncProp in changes //
            && !changes[ngsSyncProp].isFirstChange() 
            && !changes[ngsSyncProp].currentValue()){ //we only need to  sync 
            this.ngsRevealService.sync();
        }
    }
}


export const NGS_REVEAL_DIRECTIVES = [NgsRevealDirective, NgsRevealSetDirective];