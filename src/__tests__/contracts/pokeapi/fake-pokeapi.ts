import nock from "nock";
export const firstPokemonPage = require('./pokeapi-pokemon-first-page.json');
export const lastPokemonPage = require('./pokeapi-pokemon-last-page.json');
export const bulbasaurDetails = require('./pokeapi-pokemon-detail.json');

export const fakeList = (page: number, response, statusCode = 200) => {
  nock('https://pokeapi.co')
    .get('/api/v2/pokemon')
    .query({
      offset: (page - 1) * 20,
      limit: 20
    })
    .reply(statusCode, response);
}

export const fakeDetail = (pokemon: string, response=bulbasaurDetails, statusCode = 200) => {
  nock('https://pokeapi.co')
    .get('/api/v2/pokemon/' + pokemon)
    .reply(statusCode, response);
}

export const fakeListFirstPage = () => fakeList(1, firstPokemonPage);
