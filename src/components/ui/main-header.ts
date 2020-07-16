import {component, html} from "jigjs/components";
import {AppContext} from "../../app-context";
import { Route, RouteLinkElement, RouterLink } from 'jigjs/framework/router/router-link';

@component()
export class MainHeader {
  private readonly headerClass: string;
  private readonly titleLink: RouterLink;

  constructor(private readonly context: AppContext) {
    this.headerClass = this.context.css.style({
      '&': {
        height: context.style.mainHeaderHeight,
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        boxShadow: '0 0 10px rgba(125, 125, 125, 0.8)',
        background: 'linear-gradient(0deg, rgba(125, 127, 219, 0.9), rgba(125, 127, 219, 1))',
        textShadow: '-1px -1px 0 rgba(0, 0, 0, 0.2)'
      },
      '& a': {
        textDecoration: 'none',
      },
      '& h1': {
        color: '#FFFFFF',
        margin: '0',
        fontSize: '22px',
        lineHeight: context.style.mainHeaderHeight,
      },
      '& section': {
        maxWidth: context.style.layoutMaxSize,
        margin: '0 auto'
      },
      '@media': {
        [this.context.style.viewports.tablet]: {
          '& section': {
            margin: `0 ${this.context.style.defaultElementSpace}`
          }
        }
      }
    });

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
