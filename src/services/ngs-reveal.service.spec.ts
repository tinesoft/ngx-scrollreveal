/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgsRevealService } from './ngs-reveal.service';
import { NgsRevealConfig } from './ngs-reveal-config';
import { WindowService } from './window.service';

describe('Service: NgsReveal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgsRevealConfig, NgsRevealService, WindowService]
    });
  });

  it('should create the service instance...', inject([NgsRevealService], (service: NgsRevealService) => {
    expect(service).toBeTruthy();
  }));
});
