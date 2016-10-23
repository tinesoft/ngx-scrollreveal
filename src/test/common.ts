/* Borrowed from https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/common.ts */

import { TestBed, ComponentFixture } from '@angular/core/testing';

export function createGenericTestComponent<T>(html: string, type: { new (...args: any[]): T }): ComponentFixture<T> {
    TestBed.overrideComponent(type, { set: { template: html } });
    const fixture = TestBed.createComponent(type);
    fixture.detectChanges();
    return fixture as ComponentFixture<T>;
}
