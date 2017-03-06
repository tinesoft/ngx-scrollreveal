import { NgScrollrevealPage } from './app.po';

describe('ng-scrollreveal App', () => {
  let page: NgScrollrevealPage;

  beforeEach(() => {
    page = new NgScrollrevealPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
