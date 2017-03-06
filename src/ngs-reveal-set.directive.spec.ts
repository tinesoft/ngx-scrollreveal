/* tslint:disable:no-unused-variable */
import { DebugElement,Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

import { NgsRevealModule } from './ngs-reveal.module';
import { NgsRevealConfig } from './ngs-reveal-config';
import { NgsRevealSetDirective } from './ngs-reveal-set.directive';

import { not, and } from './test-helpers';

let fixture: ComponentFixture<TestComponent>;
let itemsWithDirectiveOn: DebugElement[];
let itemsWithoutDirectiveOn: DebugElement[];

function expectRevealedSetItems(itemSets: DebugElement[]) {


    itemSets.map(itemSet => {
        let items = itemSet.queryAll(By.css('.item'));
        items.map(item => {
            let dataSrIdAttr: string = item.nativeElement.getAttribute('data-sr-id');
            expect(dataSrIdAttr && +dataSrIdAttr > 0).toBe(true, 'revealed item must have "data-sr-id" attribute with > 0 value');
        });
    });

}

describe('Directive: NgsRevealSetDirective', () => {

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [NgsRevealModule.forRoot()],
            declarations: [TestComponent]
        })
            .createComponent(TestComponent);
        fixture.detectChanges(); // initial binding
        // all elements with an attached NgsRevealSetDirective
        itemsWithDirectiveOn = fixture.debugElement.queryAll(By.directive(NgsRevealSetDirective));
        // the item sets without the NgsRevealSetDirective
        itemsWithoutDirectiveOn = fixture.debugElement.queryAll(and(By.css('.itemset'), not(By.directive(NgsRevealSetDirective))));
    });


    it('should have 4 items with the directive', () => {
        expect(itemsWithDirectiveOn.length).toBe(4);
    });

    it('should have 1 item without the directive', () => {
        expect(itemsWithoutDirectiveOn.length).toBe(1);
        expect(itemsWithoutDirectiveOn[0].nativeElement.className).toEqual('itemset itemset3');
    });

    it('should add "data-sr-id" attribute to revealed items', () => {
        expectRevealedSetItems(itemsWithDirectiveOn);
    });

});

@Component({
    selector: 'test-cmp',
    template: `
  <div class="itemset itemset1" [ngsRevealSet]="{ reset: true }" [ngsSelector]="'.item'">
    <div class="item item11">Item 11</div>
    <div class="item item12">Item 12</div>
    <div class="item13">Item 13</div>
    <div class="item item14">Item 14</div>
  </div>
  <div class="itemset itemset2" ngsRevealSet ngsSelector=".item">
    <div class="item item21">Item 21</div>
    <div class="item item22">Item 22</div>
    <div class="item23">Item 23</div>
    <div class="item item24">Item 24</div>
  </div>
  <div class="itemset itemset3" >
    <div class="item item31">Item 31</div>
    <div class="item item32">Item 32</div>
    <div class="item33">Item 33</div>
    <div class="item item34">Item 34</div>
  </div>
  <div class="itemset itemset4" [ngsRevealSet]="customConfig" ngsSelector=".item">
    <div class="item item41">Item 41</div>
    <div class="item item42">Item 42</div>
    <div class="item43">Item 43</div>
    <div class="item item44">Item 44</div>
  </div>
  <div class="itemset itemset5" ngsRevealSet>
    <div class="item item51">Item 51</div>
    <div class="item item52">Item 52</div>
    <div class="item53">Item 53</div>
    <div class="item item54">Item 54</div>
  </div>
  `
})
class TestComponent {
    customConfig: NgsRevealConfig = { reset: true };
}
