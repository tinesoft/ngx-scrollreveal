/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

import { Component } from '@angular/core';

import { NgsRevealModule } from './ngs-reveal.module';
import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealDirective } from './ngs-reveal.directive';

import { not } from '../test/common';

let fixture: ComponentFixture<TestComponent>;
let itemsWithDirectiveOn: DebugElement[];
let itemsWithoutDirectiveOn: DebugElement[];

function expectRevealedItems(items: DebugElement[]) {

    items.map(item => {
        expect(item.styles['visibility']).toEqual('hidden', 'revealed item must have "visibility" set to "hidden"');
    });

    items.map(item => {
        let dataSrIdAttr: string = item.nativeElement.getAttribute('data-sr-id');
        expect(dataSrIdAttr && +dataSrIdAttr > 0).toBe(true, 'revealed item must have "data-sr-id" attribute with > 0 value');
    });

}

describe('Directive: NgsRevealDirective', () => {

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [NgsRevealModule.forRoot()],
            declarations: [TestComponent]
        })
            .createComponent(TestComponent);
        fixture.detectChanges(); // initial binding
        // all elements with an attached NgsRevealDirective
        itemsWithDirectiveOn = fixture.debugElement.queryAll(By.directive(NgsRevealDirective));
        // the items without the NgsRevealDirective
        itemsWithoutDirectiveOn = fixture.debugElement.queryAll(not(By.directive(NgsRevealDirective)));
    });


    it('should have 3 items with the directive', () => {
        expect(itemsWithDirectiveOn.length).toBe(3);
    });

    it('should have 1 item without the directive', () => {
        expect(itemsWithoutDirectiveOn.length).toBe(1);
        expect(itemsWithoutDirectiveOn[0].nativeElement.className).toEqual('item item3');
    });

    it('should set "visibility" to "hidden" and add "data-sr-id" attribute to revealed items', () => {
        expectRevealedItems(itemsWithDirectiveOn);
    });

});

@Component({
    selector: 'test-cmp',
    template: `
  <div class="item item1" [ngsReveal]="{ reset: true }">Item 1</div>
  <div class="item item2" ngsReveal>Item 2</div>
  <div class="item item3">Item 3</div>
  <div class="item item4" [ngsReveal]="customConfig">Item 4</div>
  `
})
class TestComponent {
    customConfig: NgsRevealConfig = { reset: true };
}
