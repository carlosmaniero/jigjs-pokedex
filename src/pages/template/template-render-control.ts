import {observable, observing, waitUntil} from "jigjs/reactive";
import {RenderableComponent} from "jigjs/components";

@observable()
export class TemplateRenderControl {
  @observing()
  private _component: RenderableComponent & {isLoading: boolean, notFound?: boolean};
  @observing()
  private _loadingComponent: RenderableComponent & {isLoading: boolean, notFound?: boolean};

  async updateComponent(component: RenderableComponent & {isLoading: boolean}) {
    this._loadingComponent = component;
    await waitUntil(component, () => !component.isLoading);

    if (this._loadingComponent === component) {
      this._component = component;
      this._loadingComponent = undefined;
    }
  }

  get component() {
    return this._component;
  }

  get isLoading(): boolean {
    return !!this._loadingComponent;
  }
}
