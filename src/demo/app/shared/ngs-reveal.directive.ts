import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealService } from './ngs-reveal.service';
import { Directive, OnInit, ElementRef, Input } from '@angular/core';


abstract class AbstractNgsRevealDirective {

    protected config: NgsRevealConfig;

    constructor(protected ngsRevealService: NgsRevealService) {
     }

    protected _initConfig (value: string | NgsRevealConfig): void{
        if(value && typeof value === "string"){
            this.config = JSON.stringify(value);
        }
        else if(value && typeof value === "object"){
            this.config = value;
        }
    }
}


@Directive({
    selector: '[ngsReveal]',
    host: {
        '[style.visibility]': 'hidden'
    }
})
export class NgsRevealDirective extends AbstractNgsRevealDirective implements OnInit {

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

@Directive({
    selector: '[ngsRevealSet]'
})
export class NgsRevealSetDirective extends AbstractNgsRevealDirective  implements OnInit  {

    @Input("ngsRevealSet")
    set _config (value: string | NgsRevealConfig){
        this._initConfig(value)
    }

    @Input("ngsSelector")
    selector:string;

    @Input("ngsInterval")
    interval:number;

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
}


export const NGS_REVEAL_DIRECTIVES = [NgsRevealDirective, NgsRevealSetDirective];