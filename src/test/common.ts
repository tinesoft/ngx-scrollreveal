/* Borrowed from https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/common.ts */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Predicate } from '@angular/core/src/facade/collection';


export function not<T>(predicate: Predicate<T>): Predicate<T> {
    return function () {
        return !predicate.apply(this, arguments);
    };
}

export function and<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): Predicate<T> {
    return function () {
        return predicate1.apply(this, arguments) && predicate2.apply(this, arguments);
    };
}

