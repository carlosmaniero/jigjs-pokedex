import {component, html} from "jigjs/components";
import {observing} from "jigjs/reactive";
import {TemplateRenderControl} from "./template-render-control";

describe('Template Render Control', () => {
  @component()
  class PromiseComponent {
    @observing()
    isLoading = true;

    constructor(private readonly promise: Promise<void>) {
      promise.then(() => {
        this.isLoading = false;
      })
    }

    render() {
      return html`cool!`;
    }
  }

  it('marks as loading during the component rendering', async () => {
    const templateRenderControl = new TemplateRenderControl();
    let resolver;

    const promise = new Promise<void>((resolve) => {
      resolver = resolve;
    });

    const updatingPromise = templateRenderControl.updateComponent(new PromiseComponent(promise));
    expect(templateRenderControl.isLoading).toBeTruthy();

    resolver();

    await updatingPromise;

    expect(templateRenderControl.isLoading).toBeFalsy();
  });

  it('renders the component after the promise fulfilment', async () => {
    const templateRenderControl = new TemplateRenderControl();
    let resolver;

    const promise = new Promise<void>((resolve) => {
      resolver = resolve;
    });

    const promiseComponent = new PromiseComponent(promise);
    const updatingPromise = templateRenderControl.updateComponent(promiseComponent);
    expect(templateRenderControl.component).toBeUndefined();

    resolver();

    await updatingPromise;

    expect(templateRenderControl.component).toBe(promiseComponent);
  });

  it('prevents race condition', async () => {
    const templateRenderControl = new TemplateRenderControl();
    let resolver;

    const promise = new Promise<void>((resolve) => {
      resolver = resolve;
    });

    const promiseComponent = new PromiseComponent(promise);

    const updatingPromise = templateRenderControl.updateComponent(promiseComponent);
    await templateRenderControl.updateComponent(new PromiseComponent(Promise.resolve()));

    resolver();

    await updatingPromise;

    expect(templateRenderControl.component).not.toBe(promiseComponent);
  });
});
