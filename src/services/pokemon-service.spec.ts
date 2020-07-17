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
    it('return the pokemon list', (done) => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon')
        .query({
          offset: 0,
          limit: 20
        })
        .reply(200, pokeApiFirstPage);

      const pokemonService = new PokemonService(createTestContext());
      pokemonService.fetchPokemonList(1, (_err, pokemonResponse) => {
        expect(pokemonResponse.previousPageNumber).toBe(null);
        expect(pokemonResponse.nextPageNumber).toBe(2);
        expect(pokemonResponse.pokemonList).toHaveLength(20);
        expect(pokemonResponse.pokemonList[0]).toStrictEqual(new PokemonBasicDetail(1, 'Bulbasaur'));
        done();
      });
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

      pokemonService.fetchPokemonList(49, (_err, pokemonResponse) => {
        expect(pokemonResponse.previousPageNumber).toBe(48);
        expect(pokemonResponse.nextPageNumber).toBe(null);
        expect(pokemonResponse.pokemonList).toHaveLength(4);
      });
    });
  });

  describe('pokemon detail', () => {
    it('returns the pokemon detail', (done) => {
      nock('https://pokeapi.co')
        .get('/api/v2/pokemon/bulbasaur')
        .reply(200, pokeApiBulbasaur);

      const pokemonService = new PokemonService(createTestContext());

      pokemonService.fetchPokemon('bulbasaur', (_err, pokemon) => {
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
        done();
      });
    });
  });
});
