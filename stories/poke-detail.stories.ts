import { storybookRender } from './render-storybook';
import { createTestContext } from '../src/__tests__/context';
import { PokeDetail } from '../src/components/poke-detail';
import { PokemonBasicDetail, Pokemon } from '../src/domain/pokemon';

export default { title: 'PokeDetail' };

export const bulbasaur = () => {
    const context = createTestContext();

    return storybookRender(context, new PokeDetail(
        context,
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
        )
    );
}