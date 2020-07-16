import {component, html, renderComponent} from "jigjs/components";
import {observing} from "jigjs/reactive";
import {MainTemplate} from "./template";
import {createTestContext} from "../../__tests__/context";
import {screen} from "@testing-library/dom";

@component()
class PromiseComponent {
  @observing()
  isLoading = true;

  constructor(private readonly promise: Promise<void>, private readonly text: string) {
    promise.then(() => {
      this.isLoading = false;
    })
  }

  render() {
    return html`${this.text}`;
  }
}

describe('Template', () => {
  it('renders the content', async () => {
    const template = new MainTemplate(createTestContext());

    renderComponent(document.body, template);

    await template.updateComponent(new PromiseComponent(Promise.resolve(), 'Hello'));

    expect(await screen.findByText('Hello')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders loading indicator', async () => {
    const template = new MainTemplate(createTestContext());

    renderComponent(document.body, template);

    template.updateComponent(new PromiseComponent(new Promise(() => null), 'Hello'));

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });
});
