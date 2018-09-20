/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgsRevealService } from './ngs-reveal.service';
import { NgsRevealConfig } from './ngs-reveal-config';
import { WindowService } from './window.service';

describe('Service: NgsReveal', () => {
  let service: NgsRevealService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgsRevealConfig, NgsRevealService, WindowService]
    });
    service = TestBed.get(NgsRevealService);
  });

  it('should create the service instance...', () => {
    expect(service).toBeTruthy();
  });

  it('should set callbacks on provided config when calling init()', () => {
    
    let config:NgsRevealConfig = { delay: 100};

    service.init(config);

    expect(typeof (config.beforeReveal)).toEqual('function');
    expect(typeof (config.afterReveal)).toEqual('function');
    expect(typeof (config.beforeReset)).toEqual('function');
    expect(typeof (config.afterReset)).toEqual('function');
  });

  it('should emit beforeReveal$ event when calling beforeReveal() callback', () => {

    let config:NgsRevealConfig = { delay: 100};

    service.init(config);

    let dummyElement1 = document.createElement('div');
    let dummyElement2 = document.createElement('div');
    dummyElement1.setAttribute("id", "dummy-id-1");
    dummyElement2.setAttribute("id", "dummy-id-2");

    let calls = 0;
    service.beforeReveal$.subscribe((el:HTMLElement) => {
      calls++;
      expect(el.getAttribute("id")).toEqual(`dummy-id-${calls}`);
    });

    config.beforeReveal(dummyElement1);
    config.beforeReveal(dummyElement2);

    expect(calls).toEqual(2);
  });

  it('should emit afterReveal$ event when calling afterReveal() callback', () => {

    let config:NgsRevealConfig = { delay: 100};

    service.init(config);

    let dummyElement1 = document.createElement('div');
    let dummyElement2 = document.createElement('div');
    dummyElement1.setAttribute("id", "dummy-id-1");
    dummyElement2.setAttribute("id", "dummy-id-2");

    let calls = 0;
    service.afterReveal$.subscribe((el:HTMLElement) => {
      calls++;
      expect(el.getAttribute("id")).toEqual(`dummy-id-${calls}`);
    });

    config.afterReveal(dummyElement1);
    config.afterReveal(dummyElement2);

    expect(calls).toEqual(2);
  });

  it('should emit beforeReset$ event when calling beforeReset() callback', () => {

    let config:NgsRevealConfig = { delay: 100};

    service.init(config);

    let dummyElement1 = document.createElement('div');
    let dummyElement2 = document.createElement('div');
    dummyElement1.setAttribute("id", "dummy-id-1");
    dummyElement2.setAttribute("id", "dummy-id-2");

    let calls = 0;
    service.beforeReset$.subscribe((el:HTMLElement) => {
      calls++;
      expect(el.getAttribute("id")).toEqual(`dummy-id-${calls}`);
    });

    config.beforeReset(dummyElement1);
    config.beforeReset(dummyElement2);

    expect(calls).toEqual(2);
  });

  it('should emit afterReset$ event when calling afterReset() callback', () => {

    let config:NgsRevealConfig = { delay: 100};

    service.init(config);

    let dummyElement1 = document.createElement('div');
    let dummyElement2 = document.createElement('div');
    dummyElement1.setAttribute("id", "dummy-id-1");
    dummyElement2.setAttribute("id", "dummy-id-2");

    let calls = 0;
    service.afterReset$.subscribe((el:HTMLElement) => {
      calls++;
      expect(el.getAttribute("id")).toEqual(`dummy-id-${calls}`);
    });

    config.afterReset(dummyElement1);
    config.afterReset(dummyElement2);

    expect(calls).toEqual(2);
  });
});
