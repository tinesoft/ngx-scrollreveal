import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgsRevealService } from 'ng-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  //keep refs to subscriptions to be able to unsubscribe later
  private beforeRevealSubscription: Subscription;
  private afterRevealSubscription: Subscription;
  private beforeResetSubscription: Subscription;
  private afterResetSubscription: Subscription;

  constructor(private revealService: NgsRevealService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {

    this.router.events.pipe(
      filter((event:RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
      }
    });
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
