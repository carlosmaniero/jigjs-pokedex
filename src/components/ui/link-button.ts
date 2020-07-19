import {AppContext} from "../../app-context";
import {component, html} from "jigjs/components";
import {Route, RouteLinkElement, RouterLink} from "jigjs/framework/router/router-link";
import { css } from 'jigcss';

@component()
export class LinkButton {
  private readonly link: RouterLink;

  constructor(
    private readonly context: AppContext,
    private readonly route: Route,
    private readonly text: string) {

    this.link = this.context.routerModule.linkFactory.createLink(
      route,
      new RouteLinkElement(this.text, {
        class: css`
          & {
            background-color: ${context.style.colors.primary};
            color: ${context.style.colors.textColor};
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 100px;
          }

          &:hover {
            background-color: ${context.style.colors.primaryAccent}
          }
        `
      })
    );
  }

  render() {
    return html`${this.link}`;
  }
}
