# ng2-scrollreveal - [Angular 2](http://angular.io/) directives for [ScrollReveal JS](https://scrollrevealjs.org/)

[![npm version](https://badge.fury.io/js/ng2-scrollreveal.svg)](https://badge.fury.io/js/ng2-scrollreveal)
[![Build Status](https://travis-ci.org/tinesoft/ng2-scrollreveal.svg?branch=master)](https://travis-ci.org/tinesoft/ng2-scrollreveal)
[![devDependency Status](https://david-dm.org/tinesoft/ng2-scrollreveal/dev-status.svg?branch=master)](https://david-dm.org/tinesoft/ng2-scrollreveal#info=devDependencies)

ScrollReveal JS is a great library that allows easy scroll animations for web and mobile browsers.

## Demo

View all the directives in action at https://tinesoft.github.io/ng2-scrollreveal

## Dependencies
* [Angular 2](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)
* [ScrollReveal](https://scrollrevealjs.org) (tested with 3.3.2)

## Installation
Install above dependencies via *npm*. In particular for `ScrollReveal JS`, run:
```shell
npm install --save scrollreveal
```

>**Note**: If you are using `angular-cli` to build your app, make sure that `scrollreveal` is properly listed as a [global library](https://github.com/angular/angular-cli#global-library-installation), by editing your `angular-cli.json` as such:
```
      "scripts": [
        "../node_modules/scrollreveal/dist/scrollreveal.js"
      ],
```

Now install `ng2-scrollreveal` via:
```shell
npm install --save ng2-scrollreveal
```

Once installed you need to import the main module:
```js
import {NgsRevealModule} from 'ng2-scrollreveal';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice `NgsRevealModule.forRoot()`):
```js
import {NgsRevealModule} from 'ng2-scrollreveal';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgsRevealModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import `NgsRevealModule`:

```js
import {NgsRevealModule} from 'ng2-scrollreveal';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgsRevealModule, ...], 
})
export class OtherModule {
}
```

## Usage

The library is composed of two main directives: `ngsReveal` and `ngsRevealSet`.

### ngsReveal Directive

Use this directive to reveal/hide a **single DOM element** upon scroll.

#### Basic Usage:

```html
    <div class="item" ngsReveal>..</div>
```

#### With Custom Options:

You can also pass in a custom configuration object to the directive.
```html
    <div class="item" [ngsReveal]="{ reset: true}" >..</div>
```
This will override the default configuration used when revealing this particular element.
When no configuration is passed in, the directive uses the default configuration defined at component or at application level.

Configuration options are the same as ScrollReveal JS [configuration object](https://github.com/jlmakes/scrollreveal#2-configuration). 

### ngsRevealSet Directive

Use this directive to reveal/hide a **set of DOM elements** upon scroll.

`[ngsSelector]` attribute is required, and defines which child items must be revealed/hidden on scroll.

>**Note:** The value is a list of CSS selectors (comma-separated).


#### Basic Usage:

```html
    <div class="itemset" ngsRevealSet [ngsSelector]="'.item'">
        <div class="item item1">Item 1 </div>
        <div class="item item2">Item 2 </div>
        <div class="item item3">Item 3 </div>
        <div class="item item4">Item 4 </div>
        <div class="item5">Item 5 (will not be animated)</div>
    </div>
```

#### With Custom Options:

```html
    <div class="itemset" [ngsRevealSet]="{ reset:true}" [ngsSelector]="'.item'">
        <div class="item item1">Item 1 </div>
        <div class="item item2">Item 2 </div>
        <div class="item item3">Item 3 </div>
        <div class="item item4">Item 4 </div>
        <div class="item5">Item 5 (will not be animated)</div>
    </div>
```
Configuration options are the same as ScrollReveal JS [configuration object](https://github.com/jlmakes/scrollreveal#2-configuration). 

#### Sequentially animated items: 

Child items inside the parent set can be sequentially animated, by adding the `[ngsRevealInterval]` attribute.

>**Note:** The interval is the time until the next element in the sequence begins its reveal, which is separate from the time until the element’s animation completes. In this example, the sequence interval is 50 milliseconds.

```html
    <div class="itemset" [ngsRevealSet]="{ reset:true}" [ngsInterval]="50" [ngsSelector]="'.item'">
        <div class="item item1">Item 1 </div>
        <div class="item item2">Item 2 </div>
        <div class="item item3">Item 3 </div>
        <div class="item item4">Item 4 </div>
        <div class="item5">Item 5 will not be animated)</div>
    </div>

```


## Credits

`ng2-scrollreveal` is built upon [ScrollReveal JS](https://scrollrevealjs.org) by **Julian Lloyd**. Thanks to him for the great work!