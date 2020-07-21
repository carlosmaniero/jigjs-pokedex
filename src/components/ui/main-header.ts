import {component, html} from "jigjs/components";
import {AppContext} from "../../app-context";
import { Route, RouteLinkElement, RouterLink } from 'jigjs/framework/router/router-link';
import { css, JigCssClass } from 'jigcss';

@component()
export class MainHeader {
  private readonly titleLink: RouterLink;
  private readonly headerClass: JigCssClass;
  private readonly aboutPageLink: RouterLink;

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

      & h1 {
        color: #FFFFFF;
        margin: 0;
        font-size: 22px;
        line-height: ${context.style.mainHeaderHeight};
      }
    `;

    this.titleLink = this.context.routerModule.linkFactory.createLink(
      new Route('home'), 
      new RouteLinkElement(html`<h1>Jig.js Pokedex</h1>`, {
        class: css`
          & {
            text-decoration: none;
          }
        `
      })
    );
  }

  render() {
    return html`
      <header class="${this.headerClass}">
        <section class="${css`
          & {
            max-width: ${this.context.style.layoutMaxSize};
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
          }
    
          @media ${this.context.style.viewports.tablet} {
            & {
              margin: 0 ${this.context.style.defaultElementSpace}
            }
          }
        `}">
          ${this.titleLink}

          <ul class="${css`
            & {
              display: flex;
              margin: 0 0 0 20px;
              align-items: center;
              list-style: none;
            }

            & li {
              padding: 0 ${this.context.style.defaultElementSpace};
            }
          `}">
            <li>
              <a href="https://github.com/carlosmaniero/jigjs" target="_blank" class="${css`
                & {
                  text-decoration: none;
                  color: #FFFFFF;
                  line-height: ${this.context.style.mainHeaderHeight};
                  border-right: 1px solid rgba(255, 255, 255, 0.3);
                  padding-right: ${this.context.style.defaultElementSpace};
                }

                @media ${this.context.style.viewports.mobile} {
                  & {
                    border-right: 0;
                    padding-right: 0;
                  }
                }
              `}">
              About jigjs
              </a>
            </li>
            <li class="${
              css`
                @media ${this.context.style.viewports.largeMobile} {
                  & {
                    display: none;
                  }
                }
              `}">
              <a class="github-button" href="https://github.com/carlosmaniero/jigjs" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star carlosmaniero/jigjs on GitHub">Star</a>
            </li>
          </ul>
        </section>
      </header>
    `;
  }
}
