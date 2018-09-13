import { Predicate } from '@angular/core';

/* tslint:disable:no-unused-variable */


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

