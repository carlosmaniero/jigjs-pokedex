import {createTestContext} from "../src/__tests__/context";
import {storybookRender} from "./render-storybook";
import {PokemonBasicDetail} from "../src/domain/pokemon";
import {html} from "jigjs/components";
import {PokeCard} from "../src/components/poke-card";
import {PokeGrid} from "../src/components/poke-grid";

export default { title: 'PokeCard' };

export const bulbasaur = () => {
  const context = createTestContext();

  return storybookRender(context, html`
    <div style="width: 250px">${new PokeCard(context, new PokemonBasicDetail(1, 'Bulbasaur'))}</div>
  `);
}

export const grid = () => {
  const context = createTestContext();

  return storybookRender(context, new PokeGrid(
    context,
    [
      new PokemonBasicDetail(1, 'Bulbasaur'),
      new PokemonBasicDetail(2, 'Ivysaur'),
      new PokemonBasicDetail(3, 'Venusaur'),
      new PokemonBasicDetail(4, 'Charmander'),
      new PokemonBasicDetail(5, 'Charmeleon'),
      new PokemonBasicDetail(6, 'Charizard'),
      new PokemonBasicDetail(7, 'Squirtle'),
      new PokemonBasicDetail(8, 'Wartortle'),
      new PokemonBasicDetail(9, 'Blastoise'),
      new PokemonBasicDetail(10, 'Caterpie')
    ]
  ));
}
