import { NgScrollrevealDemoPage } from './app.po';

describe('ng-scrollreveal-demo App', () => {
  let page: NgScrollrevealDemoPage;

  beforeEach(() => {
    page = new NgScrollrevealDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
