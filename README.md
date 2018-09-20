# ng-scrollreveal - [Angular](http://angular.io/) directives for [ScrollReveal JS](https://scrollrevealjs.org/)

[![npm version](https://badge.fury.io/js/ng-scrollreveal.svg)](https://badge.fury.io/js/ng-scrollreveal)
[![Build Status](https://travis-ci.org/tinesoft/ng-scrollreveal.svg?branch=master)](https://travis-ci.org/tinesoft/ng-scrollreveal)
[![Coverage Status](https://coveralls.io/repos/github/tinesoft/ng-scrollreveal/badge.svg?branch=master)](https://coveralls.io/github/tinesoft/ng-scrollreveal?branch=master)
[![devDependency Status](https://david-dm.org/tinesoft/ng-scrollreveal/dev-status.svg?branch=master)](https://david-dm.org/tinesoft/ng-scrollreveal#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/tinesoft/ng-scrollreveal.svg)](https://greenkeeper.io/)

ScrollReveal JS is a great library that allows easy scroll animations for web and mobile browsers.

## Demo

View all the directives in action at https://tinesoft.github.io/ng-scrollreveal

## Dependencies

* [Angular](https://angular.io) (*requires* Angular 6+, [v2.2.0](https://github.com/tinesoft/ng-scrollreveal/tree/v2.2.0) is the latest version for Angular < 6 )
* [ScrollReveal](https://scrollrevealjs.org) (*requires* ScrollReveal 4 or higher, tested with 4.0.2)

## Installation

Install above dependencies via *npm*. In particular for `ScrollReveal JS`, run:

```shell
npm install --save scrollreveal
```

---

##### Angular-CLI

>**Note**: If you are using `angular-cli` to build your app, make sure that `scrollreveal` is properly listed as a [global library](https://github.com/angular/angular-cli/wiki/stories-global-lib), by editing your `angular.json` as such:

```
      "scripts": [
        "../node_modules/scrollreveal/dist/scrollreveal.js"
      ],
```

##### SystemJS

>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ng-scrollreveal`:

```ts
map: {
  'ng-scrollreveal': 'node_modules/ng-scrollreveal/bundles/ng-scrollreveal.min.js',
}
```

In your systemjs config file, `meta` needs to tell the System loader how to load `scrollreveal`:

```ts
    meta: {
    './node_modules/scrollreveal/dist/scrollreveal.min.js': {
            format: 'amd'
        }
    }
```

In your index.html file, add script tag to load  `scrollreveal` globally:

```html
    <!-- 1. Configure SystemJS -->
    <script src="system.config.js"></script>
    <!-- 2. Add scrollreveal dependency-->
    <script src="node_modules/scrollreveal/dist/scrollreveal.min.js"></script>
```

---

Now install `ng-scrollreveal` via:

```shell
npm install --save ng-scrollreveal
```

Once installed you need to import the main module:

```ts
import {NgsRevealModule} from 'ng-scrollreveal';
```

```ts
import {NgsRevealModule} from 'ng-scrollreveal';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgsRevealModule],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Usage

The library is composed of two main directives: `ngsReveal` and `ngsRevealSet`.

### ngsReveal Directive

---

Use this directive to reveal/hide a **single DOM element** upon scroll.

##### Basic Usage

```html
    <div class="item" ngsReveal>..</div>
```

##### With Custom Options

You can also pass in a custom configuration object to the directive.

```html
    <div class="item" [ngsReveal]="{ reset: true}" >..</div>
```

This will override the default configuration used when revealing this particular element.
When no configuration is passed in, the directive uses the default configuration defined at component or at application level.

Configuration options are the same as ScrollReveal JS [configuration object](https://scrollrevealjs.org/guide/customization.html).

### ngsRevealSet Directive

---

Use this directive to reveal/hide a **set of DOM elements** upon scroll.

`[ngsSelector]` attribute is required, and defines which child items must be revealed/hidden on scroll.

>**Note:** The value is a list of CSS selectors (comma-separated).


#### Basic Usage

```html
    <div class="itemset" ngsRevealSet [ngsSelector]="'.item'">
        <div class="item item1">Item 1</div>
        <div class="item item2">Item 2</div>
        <div class="item item3">Item 3</div>
        <div class="item item4">Item 4</div>
        <div class="item5">Item 5 (will not be animated)</div>
    </div>
```

#### With Custom Options

```html
    <div class="itemset" [ngsRevealSet]="{ reset:true}" [ngsSelector]="'.item'">
        <div class="item item1">Item 1</div>
        <div class="item item2">Item 2</div>
        <div class="item item3">Item 3</div>
        <div class="item item4">Item 4</div>
        <div class="item5">Item 5 (will not be animated)</div>
    </div>
```

Configuration options are the same as ScrollReveal JS [configuration object](https://github.com/jlmakes/scrollreveal#2-configuration). 

#### Sequentially animated items

Child items inside the parent set can be sequentially animated, by adding the `[ngsRevealInterval]` attribute.

>**Note:** The interval is the time until the next element in the sequence begins its reveal, which is separate from the time until the element’s animation completes. In this example, the sequence interval is 50 milliseconds.

```html
    <div class="itemset" [ngsRevealSet]="{ reset:true}" [ngsInterval]="50" [ngsSelector]="'.item'">
        <div class="item item1">Item 1</div>
        <div class="item item2">Item 2</div>
        <div class="item item3">Item 3</div>
        <div class="item item4">Item 4</div>
        <div class="item5">Item 5 (will not be animated)</div>
    </div>

```

### Global Configuration

---

You can inject the config service, typically in your root component, and customize the values of its properties in order to provide default values for all the ng-reveal directives used in the application.

```ts
import {Component} from '@angular/core';
import {NgsRevealConfig} from 'ng-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgsRevealConfig] // add NgsRevealConfig to the component providers
})
export class AppComponent {
  constructor(config: NgsRevealConfig) {
    // customize default values of ng-scrollreveal directives used by this component tree
    config.duration = 5000;
    config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';

    //other options here
  }
}
```


### Subscribing to ScrollReveal events

---

You can now subscribe to some events triggered by `ScrollReveal` before/after an element is revealed/reset.

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgsRevealService } from 'ng-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  constructor(private revealService: NgsRevealService) {
  }
  
  ngOnInit() {
    // subscribe to ScrollReveal observables to react to main events
    this.beforeRevealSubscription = this.revealService.beforeReveal$.subscribe(
      (el: HTMLElement) => {
        console.log(`beforeReveal of '<${el.nodeName}>.${el.className}'`);
      });

    this.afterRevealSubscription = this.revealService.afterReveal$.subscribe(
      (el: HTMLElement) => {
        console.log(`afterReveal of '<${el.nodeName}>.${el.className}'`);
    });

    this.beforeResetSubscription = this.revealService.beforeReset$.subscribe(
      (el: HTMLElement) => {
        console.log(`beforeReset of '<${el.nodeName}>.${el.className}'`);
    });

    this.afterResetSubscription = this.revealService.afterReset$.subscribe(
      (el: HTMLElement) => {
        console.log(`afterReset of '<${el.nodeName}>.${el.className}'`);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ScrollReveal observables to prevent memory leaks
    this.beforeRevealSubscription.unsubscribe();
    this.afterRevealSubscription.unsubscribe();
    this.beforeResetSubscription.unsubscribe();
    this.afterResetSubscription.unsubscribe();
  }
}

```

## Credits

`ng-scrollreveal` is built upon [ScrollReveal JS](https://scrollrevealjs.org) by **Julian Lloyd**. Thanks to him for the great work!
