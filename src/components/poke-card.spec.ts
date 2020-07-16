import { renderComponent } from "jigjs/components";
import { PokemonBasicDetail } from "../domain/pokemon";
import { createTestContext } from "../__tests__/context";
import { PokeCard } from "./poke-card";
import { screen } from '@testing-library/dom';

describe('PokeCard', () => {
    it('renders the pokemon name', () => {
        const appContext = createTestContext();
        const pokeCard = new PokeCard(appContext, new PokemonBasicDetail(1, 'Bulbasaur'));
        renderComponent(document.body, pokeCard);

        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    it('goes to pokemon page on click', () => {
        const appContext = createTestContext();
        const pokeCard = new PokeCard(appContext, new PokemonBasicDetail(1, 'Bulbasaur'));

        renderComponent(document.body, pokeCard);

        screen.getByText('Bulbasaur').click();

        expect(appContext.routerModule.history.getCurrentUrl()).toBe('/pokemon/bulbasaur');
    });
});
