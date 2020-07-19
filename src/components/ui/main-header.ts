import {component, html} from "jigjs/components";
import {AppContext} from "../../app-context";
import { Route, RouteLinkElement, RouterLink } from 'jigjs/framework/router/router-link';
import { css, JigCssClass } from 'jigcss';

@component()
export class MainHeader {
  private readonly titleLink: RouterLink;
  private readonly headerClass: JigCssClass;

  constructor(private readonly context: AppContext) {
    this.headerClass = css`
      & {
        height: ${context.style.mainHeaderHeight};
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 0 10px rgba(125, 125, 125, 0.8);
        background: linear-gradient(0deg, rgba(125, 127, 219, 0.9), rgba(125, 127, 219, 1));
        text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);
      }

      & a {
        text-decoration: none;
      }

      & h1 {
        color: #FFFFFF;
        margin: 0;
        font-size: 22px;
        line-height: ${context.style.mainHeaderHeight};
      }

      & section {
        max-width: ${context.style.layoutMaxSize};
        margin: 0 auto
      }

      @media ${this.context.style.viewports.tablet} {
        & section {
          margin: 0 ${this.context.style.defaultElementSpace}
        }
      }
    `;

    this.titleLink = this.context.routerModule.linkFactory.createLink(
      new Route('home'), 
      new RouteLinkElement(html`<h1>Jig.js Pokedex</h1>`)
    );
  }

  render() {
    return html`
      <header class="${this.headerClass}">
        <section>
          ${this.titleLink}
        </section>
      </header>
    `;
  }
}
