import fetch from "node-fetch";
import {PokemonBasicDetail, Pokemon, PokemonSkills} from "../domain/pokemon";
import {AppContext} from "../app-context";

export interface PokemonListResponse {
  pokemonList: PokemonBasicDetail[];
  nextPageNumber: number | null;
  previousPageNumber: number | null;

}

interface PokemonItemResponse {
  name: string;
  url: string;
}

export class PokemonService {
  private readonly API_ITEMS_LIMIT = 20;

  constructor(private readonly context: AppContext) {
  }

  async fetchPokemonList(page: number): Promise<PokemonListResponse> {
    const response = await this.fetchData(page);

    this.context.transferState.setState(this.transferStateKey(page), response);

    return this.map(page, response);
  }

  private map(page: number, response) {
    return {
      previousPageNumber: this.getPreviousPageNumber(page),
      nextPageNumber: this.getNextPageNumber(page, response.count),
      pokemonList: response.results.map((result) => this.toPokemonBasicDetail(result))
    };
  }

  async fetchPokemon(pokemonSlug: string): Promise<Pokemon> {
    if (this.context.transferState.hasState(`pokeapi-fetch-detail-${pokemonSlug}`)) {
      return this.mapPokemonDetail(this.context.transferState.getState(`pokeapi-fetch-detail-${pokemonSlug}`));
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSlug}`);
    const responseBody = await response.json();

    this.context.transferState.setState(`pokeapi-fetch-detail-${pokemonSlug}`, responseBody);

    return this.mapPokemonDetail(responseBody);
  }

  private mapPokemonDetail(responseBody: any): Pokemon {
    return new Pokemon(
      new PokemonBasicDetail(responseBody.id, this.capitalizeName(responseBody.name)),
      this.skillsOfResponse(responseBody.stats),
      this.mapSprites(responseBody.sprites));
  }

  mapSprites(sprites: Record<string, string>): string[] {
    return Object.values(sprites).filter((sprite) => !!sprite);
  }

  skillsOfResponse(stats: any[]): PokemonSkills {
    return {
      attack: this.statNumber('attack', stats),
      defense: this.statNumber('defense', stats),
      hp: this.statNumber('hp', stats),
      specialAttack: this.statNumber('special-attack', stats),
      specialDefense: this.statNumber('special-defense', stats),
      speed: this.statNumber('speed', stats)
    }
  }

  private statNumber(statName: string, stats: any[]): number {
    return stats.find((stat) => stat.stat.name === statName)?.base_stat;
  }

  private async fetchData(page: number) {
    if (this.context.transferState.hasState(this.transferStateKey(page))) {
      return this.context.transferState.getState(this.transferStateKey(page));
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${this.getOffset(page)}&limit=${this.API_ITEMS_LIMIT}`);
    return await response.json();
  }

  private transferStateKey(page: number) {
    return `pokeapi-fetch-page-${page}`;
  }

  private getPreviousPageNumber(page: number) {
    if (page === 1) {
      return null;
    }
    return page - 1;
  }

  private getNextPageNumber(page: number, count: number) {
    if (Math.ceil(count / this.API_ITEMS_LIMIT) == page) {
      return null;
    }
    return page + 1;
  }

  private getOffset(page: number) {
    return (page - 1) * this.API_ITEMS_LIMIT;
  }

  private toPokemonBasicDetail(result: PokemonItemResponse) {
    return new PokemonBasicDetail(
      this.extractsId(result.url),
      this.capitalizeName(result.name));
  }

  private capitalizeName(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  private extractsId(url: string) {
    return parseInt(/(\d+)\/$/.exec(url)[1]);
  }
}
