import {component, html, RenderableComponent, connectedCallback} from "jigjs/components";
import {AppContext} from "../../app-context";
import {TemplateRenderControl} from "./template-render-control";
import {MainHeader} from "../../components/ui/main-header";
import {propagate, observing} from "jigjs/reactive/index";
import {PokemonList} from "../pokemon-list/pokemon-list";
import { Renderable } from 'jigjs/template/render';
import { NotFound } from '../not-found/not-found';
import { JigCssClass, css } from 'jigcss';


@component()
export class MainTemplate {
  private readonly header: MainHeader;
  private readonly loadingIndicatorClass: JigCssClass;
  private readonly mainClass: JigCssClass;

  @propagate()
  private readonly templateRenderControl: TemplateRenderControl

  constructor(
    private readonly context: AppContext) {

    this.header = new MainHeader(context);
    this.templateRenderControl = new TemplateRenderControl();

    this.mainClass = css`
      & {
        margin-top: ${this.context.style.mainHeaderHeight}
      }
    `;

    this.loadingIndicatorClass = css`
      & {
        background-color: rgba(255, 255, 255, 0.8);
        position: fixed;
        width: 100%;
        height: 100%;
        color: ${this.context.style.colors.primaryAccent};
        font-size: 60px;
        opacity: 0;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadein 0.5s;
        animation-delay: 1s
      }
    `;
  }

  render() {
    return html`
      ${this.header}
      ${this.renderMain()}
      <footer class="${
        css`
          & {
            margin: 0 auto;
            max-width: ${this.context.style.layoutMaxSize};
            text-align: center;
            color: #ffffff;
          }

          & p {
            margin: 5px 0;
          }

          & a {
            color: #ffffff;
          }
        `}">
        <p>Pokémon and Pokémon character names are trademarks of Nintendo ®.</p>
        <p>
          <small>Data is provided by <a href="https://pokeapi.co/">https://pokeapi.co/</a> and cover images by <a href="https://pokemondb.net/">https://pokemondb.net/</a>.</small>
        </p>
      </footer>
      ${this.renderLoadingIndicator()}
    `
  }

  renderMain(): Renderable {
    if (this.templateRenderControl.component) {
      return html`<main class="${this.mainClass}">
        ${this.templateRenderControl.component.notFound ? new NotFound(this.context) : this.templateRenderControl.component}
      </main>`
    }
  }

  private renderLoadingIndicator() {
    if (!this.templateRenderControl.isLoading) {
      return;
    }

    return html`
      <div class="${this.loadingIndicatorClass}">
        Loading...            
      </div>`;
  }

  updateComponent(component: RenderableComponent & {isLoading: boolean, notFound?: boolean}) {
    return this.templateRenderControl.updateComponent(component);
  }
}
