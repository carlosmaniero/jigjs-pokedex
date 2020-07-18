import '@testing-library/jest-dom';
import {render} from "jigjs/template/render";
import nock from "nock";
declare var jsdom: any

global.afterEach(() => {
  render(document.createElement('div'))(document.body);
  nock.restore();
});

global.beforeEach(() => {
  !nock.isActive() && nock.activate();
});