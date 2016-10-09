import { Ng2ScrollrevealPage } from './app.po';

describe('ng2-scrollreveal App', function() {
  let page: Ng2ScrollrevealPage;

  beforeEach(() => {
    page = new Ng2ScrollrevealPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
