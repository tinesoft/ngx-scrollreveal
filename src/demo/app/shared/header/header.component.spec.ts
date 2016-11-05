/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { HeaderComponent } from './header.component';
import { HomeComponent } from './../../home/home.component';
import { GettingStartedComponent } from './../../getting-started/getting-started.component';
import { AppRoutingModule } from './../../app-routing';
import { NgsRevealModule } from './../../../../lib/ngs-reveal.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        NgsRevealModule.forRoot()],
      declarations: [
        HeaderComponent,
        GettingStartedComponent,
        HomeComponent]
      ,
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
