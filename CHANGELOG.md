<a name="3.0.0"></a>
# [3.0.0](https://github.com/tinesoft/ngx-scrollreveal/compare/v2.2.0...v3.0.0) (2018-09-25)


### Chores

* **core:** rename the project into `ngx-scrollreveal` ([f4c4d1a](https://github.com/tinesoft/ngx-scrollreveal/commit/f4c4d1a))


### Features

* **core:** migrate to ScrollReveal `v4.x.x` ([7b3c816](https://github.com/tinesoft/ngx-scrollreveal/commit/7b3c816))
* **core:** remove the `forRoot()` in `NgsRevealModule` (no longer needed with Angular 6) ([b708dec](https://github.com/tinesoft/ngx-scrollreveal/commit/b708dec))
* **core:** update to `Angular v6.x.x` and higher ([54c8a0a](https://github.com/tinesoft/ngx-scrollreveal/commit/54c8a0a))


### BREAKING CHANGES

* **core:** imports in your application must be updated to consider the new package name `ngx-scrollreveal`

Before:
```
npm install --save ng-scrollreveal

...

import { ... } from 'ng-scrollreveal';
```

After:
```
npm install --save ngx-scrollreveal

...

import { ... } from 'ngx-scrollreveal';
```
* **core:** `NgsRevealModule.forRoot()` has been removed, and internally replaced by use of new `providedIn` option in `@Injectable`

Before:

```ts
import {NgsRevealModule} from 'ng-scrollreveal';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgsRevealModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

After:

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
* **core:** migration to ScrollReveal `v4.x.x` brings some breaking changes to be addressed

- `@types/scrollreveal` is no longer necessary and **must be removed** from your `package.son`
- `options.distance` now only supports `em`, `px` and `%` values
- `NgsRevealConfig` default values have been updated to match [ScrollReveal](https://scrollrevealjs.org/api/defaults.html)'s
- be aware that `ScrollReveal` now requires a **commercial license**, unless for [GPL-3.0](https://opensource.org/licenses/GPL-3.0) compatible open source projects.



<a name="2.2.0"></a>
# [2.2.0](https://github.com/tinesoft/ngx-scrollreveal/compare/v2.1.0...v2.2.0) (2017-11-22)


### Features

* **packaging:** relax `peerDependencies` versions ([ccfcec2](https://github.com/tinesoft/ngx-scrollreveal/commit/ccfcec2))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/tinesoft/ngx-scrollreveal/compare/0.6.1...v2.1.0) (2017-09-23)


### Features

* **uinversal:** add universal (server side rendering) support and update demo app ([6fac32b](https://github.com/tinesoft/ngx-scrollreveal/commit/6fac32b)), closes [#50](https://github.com/tinesoft/ngx-scrollreveal/issues/50)



<a name="2.0.3"></a>
## [2.0.3](https://github.com/tinesoft/ngx-scrollreveal/compare/2.0.2...v2.0.3) (2017-06-08)


### Bug Fixes

* **config:** relax type of `config.container` into `Element | string` ([b8b56d0](https://github.com/tinesoft/ngx-scrollreveal/commit/b8b56d0)), closes [#15](https://github.com/tinesoft/ngx-scrollreveal/issues/15)



<a name="2.0.2"></a>
## [2.0.2](https://github.com/tinesoft/ngx-scrollreveal/compare/2.0.1...2.0.2) (2017-03-24)


### Bug Fixes

* **peerDependencies:** remove 'angular-cli-ghpages' from peerDependencies (accidentally added since v2.0.0) ([141e133](https://github.com/tinesoft/ngx-scrollreveal/commit/141e133))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/tinesoft/ngx-scrollreveal/compare/2.0.0...2.0.1) (2017-03-24)


### Bug Fixes

* **config:** export `NgsRevealConfig` service to allow global configuration ([a3c64cc](https://github.com/tinesoft/ngx-scrollreveal/commit/a3c64cc)), closes [#6](https://github.com/tinesoft/ngx-scrollreveal/issues/6)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/tinesoft/ngx-scrollreveal/compare/1.0.1...2.0.0) (2017-03-08)


### Code Refactoring

* **all:** move demo app to own folder and improve build tools ([504499b](https://github.com/tinesoft/ngx-scrollreveal/commit/504499b))


### Features

* **all:** making [@IgorMinar](https://github.com/IgorMinar) happy all the way (it's just angular!) ([061c648](https://github.com/tinesoft/ngx-scrollreveal/commit/061c648))


### BREAKING CHANGES

* **all:** rename UMD bundled file from `ng-scrollreveal.min.js` to `ng-scrollreveal.umd.js`
* **all:** rename package from `ng2-scrollreveal` to `ng-scrollreveal` to conform with new Angular Naming Guidelines.

This only affect how you install and import the library (no actual breaking changes in code).

Before:

```
npm install --save ng2-scrollreveal

...

import { NgsRevealModule } from 'ng2-scrollreveal';
```

After:

```
npm install --save ng-scrollreveal
...

import { NgsRevealModule } from 'ng-scrollreveal';
```



<a name="1.0.1"></a>
## [1.0.1](https://github.com/tinesoft/ngx-scrollreveal/compare/1.0.0...1.0.1) (2016-11-27)



<a name="1.0.0"></a>
# 1.0.0 (2016-11-09)



