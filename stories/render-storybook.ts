import {component, html, RenderableComponent, renderComponent} from "jigjs/components";
import {AppContext} from "../src/app-context";
import {Renderable} from "jigjs/template/render";


export const storybookRender = (context: AppContext, toRenderComponent: Renderable | RenderableComponent) => {
  @component()
  class StorybookComponent {
    render() {
      return html`
        <link href="https://fonts.googleapis.com/css2?family=Mandali&display=swap" rel="stylesheet">
        <style>
            body {
                padding: 0;
                margin: 0;
                background: #0b050e;
                font-family: Mandali, sans-serif;
            }
        </style>
        ${toRenderComponent}
      `;
    }
  }

  const wrapper = document.createElement('div');

  Promise.resolve().then(() => {
    renderComponent(wrapper, new StorybookComponent());
  });

  return wrapper;
}
