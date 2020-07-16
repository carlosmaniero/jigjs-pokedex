import '@testing-library/jest-dom';
import {render} from "jigjs/template/render";
declare var jsdom: any

global.afterEach(() => {
  render(document.createElement('div'))(document.body);
});