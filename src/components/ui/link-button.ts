import {AppContext} from "../../app-context";
import {component, html} from "jigjs/components";
import {Route, RouteLinkElement, RouterLink} from "jigjs/framework/router/router-link";

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
        class: context.css.style({
          '&': {
            backgroundColor: context.style.colors.primary,
            color: context.style.colors.textColor,
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '100px'
          },
          '&:hover': {
            backgroundColor: context.style.colors.primaryAccent
          }
        })
      })
    );
  }

  render() {
    return html`${this.link}`;
  }
}
