import {component, disconnectedCallback, html} from "jigjs/components";
import {AppContext} from "../app-context";
import {PokemonBasicDetail} from "../domain/pokemon";
import {PokeCard} from "./poke-card";

@component()
export class PokeGrid {
  private readonly gridClass: string;

  constructor(
    private readonly context: AppContext,
    private readonly pokemonList: PokemonBasicDetail[]
  ) {
    this.gridClass = this.context.css.style({
      '&': {
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridGap: this.context.style.defaultElementSpace,
        maxWidth: this.context.style.layoutMaxSize,
        padding: this.context.style.defaultElementSpace
      },
      '@media': {
        [this.context.style.viewports.tablet]: {
          '&': {
            gridTemplateColumns: '1fr 1fr 1fr'
          }
        },
        [this.context.style.viewports.largeMobile]: {
          '&': {
            gridTemplateColumns: '1fr 1fr'
          }
        },
        [this.context.style.viewports.mobile]: {
          '&': {
            gridTemplateColumns: '1fr'
          }
        }
      }
    });
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
