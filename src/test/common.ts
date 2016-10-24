/* Borrowed from https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/common.ts */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Predicate } from '@angular/core/src/facade/collection';


export function createGenericTestComponent<T>(html: string, type: { new (...args: any[]): T }): ComponentFixture<T> {
    TestBed.overrideComponent(type, { set: { template: html } });
    const fixture = TestBed.createComponent(type);
    fixture.detectChanges();
    return fixture as ComponentFixture<T>;
}


export function not<T>(predicate: Predicate<T>): Predicate<T> {
    return function () {
        return !predicate.apply(this, arguments);
    };

}
