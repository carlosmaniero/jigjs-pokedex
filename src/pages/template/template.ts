import {component, html, RenderableComponent, connectedCallback} from "jigjs/components";
import {AppContext} from "../../app-context";
import {TemplateRenderControl} from "./template-render-control";
import {MainHeader} from "../../components/ui/main-header";
import {propagate, observing} from "jigjs/reactive/index";
import {PokemonList} from "../pokemon-list/pokemon-list";
import { Renderable } from 'jigjs/template/render';
import { NotFound } from '../not-found/not-found';


@component()
export class MainTemplate {
  private readonly loadingIndicatorClass: string;
  private readonly header: MainHeader;
  private readonly mainClass: string;

  @propagate()
  private readonly templateRenderControl: TemplateRenderControl

  constructor(
    private readonly context: AppContext) {

    this.header = new MainHeader(context);
    this.templateRenderControl = new TemplateRenderControl();

    this.mainClass = this.context.css.style({
      '&': {
        marginTop: this.context.style.mainHeaderHeight
      }
    });

    this.loadingIndicatorClass = this.context.css.style({
      '&': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'fixed',
        width: '100%',
        height: '100%',
        color: this.context.style.colors.primaryAccent,
        fontSize: '60px',
        opacity: '0',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadein 0.5s',
        animationDelay: '1s'
      }
    });
  }

  render() {
    return html`
      ${this.header}
      ${this.renderMain()}
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
