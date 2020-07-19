import {component, disconnectedCallback, html} from "jigjs/components";
import {AppContext} from "../app-context";
import {PokemonBasicDetail} from "../domain/pokemon";
import {PokeCard} from "./poke-card";
import { JigCssClass, css } from 'jigcss';

@component()
export class PokeGrid {
  private readonly gridClass: JigCssClass;

  constructor(private readonly context: AppContext, private readonly pokemonList: PokemonBasicDetail[]) {
    this.gridClass = css`
      & {
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: ${this.context.style.defaultElementSpace};
        max-width: ${this.context.style.layoutMaxSize};
        padding: ${this.context.style.defaultElementSpace}
      }

      @media ${this.context.style.viewports.tablet} {
        & {
          grid-template-columns: 1fr 1fr 1fr
        }
      }

      @media ${this.context.style.viewports.largeMobile} {
        & {
          grid-template-columns: 1fr 1fr
        }
      }

      @media ${this.context.style.viewports.mobile} {
        & {
          grid-template-columns: 1fr
        }
      }
    `;
  }

  render() {
    return html`
      <section class="${this.gridClass}">
        ${this.renderPokemonList()}
      </section>
    `;
  }

  private renderPokemonList() {
    return this.pokemonList
      .map((pokemon) => new PokeCard(this.context, pokemon));
  }
}
