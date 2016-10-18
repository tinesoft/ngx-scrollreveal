/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgsRevealService } from './ngs-reveal.service';

describe('Service: NgsReveal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgsRevealService]
    });
  });

  it('should ...', inject([NgsRevealService], (service: NgsRevealService) => {
    expect(service).toBeTruthy();
  }));
});
