import { component, html } from "jigjs/components";
import { observing } from "jigjs/reactive";
import { AppContext } from "../../app-context";
import { PokeGrid } from "../../components/poke-grid";
import { LinkButton } from "../../components/ui/link-button";
import { PokemonListResponse, PokemonService } from "../../services/pokemon-service";

@component()
export class PokemonList {
  private readonly page: number;
  private readonly pageNavigationClass: string;

  @observing()
  private pokemonListResponse: PokemonListResponse;
  @observing()
  private _isLoading = true;
  @observing()
  private pokemonGrid: PokeGrid;

  constructor(private readonly context: AppContext, page: number) {
    this.page = page;

    this.pageNavigationClass = this.context.css.style({
      '&': {
        margin: '0 auto',
        maxWidth: this.context.style.layoutMaxSize,
        display: 'flex',
        justifyContent: 'space-between'
      },
      '@media': {
        [this.context.style.viewports.tablet]: {
            '&': {
                padding: this.context.style.defaultElementSpace
            },
        }
    }
    });

    new PokemonService(this.context).fetchPokemonList(this.page)
      .then((result) => {
        this.pokemonListResponse = result;
        this._isLoading = false;
        this.pokemonGrid = new PokeGrid(this.context, this.pokemonListResponse.pokemonList);
      });
  }

  get isLoading() {
    return this._isLoading;
  }

  render() {
    return html`
      ${this.pokemonGrid}

      <nav class="${this.pageNavigationClass}">
        <div>
            ${(this.renderPreviousButton())}
        </div>
        <div>        
            ${(this.renderNextButton())}
        </div>
      </nav>
    `;
  }

  private renderNextButton() {
    if (!this.hasNextPageNumber()) {
      return;
    }
    return new LinkButton(
      this.context,
      this.context.routes.pokemonPage(this.pokemonListResponse.nextPageNumber),
      "Next Page"
    );
  }

  private renderPreviousButton() {
    if (!this.hasPreviousPageNumber()) {
      return;
    }

    return new LinkButton(
      this.context,
      this.context.routes.pokemonPage(this.pokemonListResponse.previousPageNumber),
      "Previous Page"
    );
  }

  private hasNextPageNumber() {
    return !this.isLoading && this.pokemonListResponse.nextPageNumber;
  }

  private hasPreviousPageNumber() {
    return !this.isLoading && this.pokemonListResponse.previousPageNumber;
  }
}
