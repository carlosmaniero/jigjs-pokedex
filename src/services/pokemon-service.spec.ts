import nock from "nock";
import { PokemonBasicDetail, Pokemon } from "../domain/pokemon";
import { createTestContext } from "../__tests__/context";
import { firstPokemonPage } from "../__tests__/contracts/pokeapi/fake-pokeapi";
import { PokemonService } from "./pokemon-service";

const pokeApiFirstPage = require('../__tests__/contracts/pokeapi/pokeapi-pokemon-first-page.json');
const pokeApiLastPage = require('../__tests__/contracts/pokeapi/pokeapi-pokemon-last-page.json');
const pokeApiBulbasaur = require('../__tests__/contracts/pokeapi/pokeapi-pokemon-detail.json');

describe('Pokemon Service', () => {
  afterEach(() => {
    nock.restore();
  })

  beforeEach(() => {
    !nock.isActive() && nock.activate();
  });

  describe('pokemon list', () => {
    it('return the pokemon list', async () => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon')
        .query({
          offset: 0,
          limit: 20
        })
        .reply(200, pokeApiFirstPage);

      const pokemonService = new PokemonService(createTestContext());
      const pokemonResponse = await pokemonService.fetchPokemonList(1);

      expect(pokemonResponse.previousPageNumber).toBe(null);
      expect(pokemonResponse.nextPageNumber).toBe(2);
      expect(pokemonResponse.pokemonList).toHaveLength(20);
      expect(pokemonResponse.pokemonList[0]).toStrictEqual(new PokemonBasicDetail(1, 'Bulbasaur'));
    });

    it('persists the fetched data into the transfer state', async () => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon')
        .query({
          offset: 0,
          limit: 20
        })
        .reply(200, pokeApiFirstPage);

      const context = createTestContext();

      const pokemonService = new PokemonService(context);
      await pokemonService.fetchPokemonList(1);

      expect(context.transferState.getState('pokeapi-fetch-page-1')).toEqual(pokeApiFirstPage);
    });

    it('return the pokemon list from transfer state', async () => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon')
        .query({
          offset: 0,
          limit: 20
        })
        .reply(500);

      const context = createTestContext();

      context.transferState.setState('pokeapi-fetch-page-1', firstPokemonPage);

      const pokemonService = new PokemonService(context);
      const pokemonResponse = await pokemonService.fetchPokemonList(1);

      expect(pokemonResponse.previousPageNumber).toBe(null);
      expect(pokemonResponse.nextPageNumber).toBe(2);
      expect(pokemonResponse.pokemonList).toHaveLength(20);
      expect(pokemonResponse.pokemonList[0]).toStrictEqual(new PokemonBasicDetail(1, 'Bulbasaur'));
    });

    it('return the last page', async () => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon')
        .query({
          offset: 960,
          limit: 20
        })
        .reply(200, pokeApiLastPage);

      const pokemonService = new PokemonService(createTestContext());
      const pokemonResponse = await pokemonService.fetchPokemonList(49);

      expect(pokemonResponse.previousPageNumber).toBe(48);
      expect(pokemonResponse.nextPageNumber).toBe(null);
      expect(pokemonResponse.pokemonList).toHaveLength(4);
    });
  });

  describe('pokemon list', () => {
    it('returns the pokemon detail', async () => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon/bulbasaur')
        .reply(200, pokeApiBulbasaur);

      const pokemonService = new PokemonService(createTestContext());
      const pokemon: Pokemon = await pokemonService.fetchPokemon('bulbasaur');

      expect(pokemon).toStrictEqual(
        new Pokemon(
          new PokemonBasicDetail(1, 'Bulbasaur'), 
          {
            hp: 45,
            attack: 50,
            defense: 49,
            specialAttack: 65,
            specialDefense: 67,
            speed: 44
          },
          [
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
          ]
        )
      );
    });

    it('persists the response into the transfer state', async () => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon/bulbasaur')
        .reply(200, pokeApiBulbasaur);

      const context = createTestContext();
      const pokemonService = new PokemonService(context);
      const pokemon: Pokemon = await pokemonService.fetchPokemon('bulbasaur');

      expect(context.transferState.getState('pokeapi-fetch-detail-bulbasaur')).toEqual(pokeApiBulbasaur);
    });

    it('returns the pokemon detail from transfer state if exists', async () => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon/bulbasaur')
        .reply(500);

      const context = createTestContext();
      context.transferState.setState('pokeapi-fetch-detail-bulbasaur', pokeApiBulbasaur);
      const pokemonService = new PokemonService(context);
      const pokemon: Pokemon = await pokemonService.fetchPokemon('bulbasaur');

      expect(pokemon).toStrictEqual(
        new Pokemon(
          new PokemonBasicDetail(1, 'Bulbasaur'), 
          {
            hp: 45,
            attack: 50,
            defense: 49,
            specialAttack: 65,
            specialDefense: 67,
            speed: 44
          },
          [
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
          ]
        )
      );
    });
    
  });
});
