import {
  fakeList,
  fakeListFirstPage,
  firstPokemonPage,
  lastPokemonPage
} from "../../__tests__/contracts/pokeapi/fake-pokeapi";
import {renderComponent} from "jigjs/components";
import {screen} from "@testing-library/dom";
import {waitUntil} from "jigjs/reactive";
import {appFactory} from "../../app";
import {App} from "jigjs/framework/app/app";
import {render} from "jigjs/template/render";
import { Platform } from "jigjs/framework/platform";


describe('Poke list', () => {
  let app: App;

  describe('first page', () => {
    beforeEach(async () => {
      fakeListFirstPage();

      app = appFactory(window, Platform.browser());

      renderComponent(document.body, app);

      await waitUntil(app, () => app.isInitialRenderFinished());
    });

    it('renders the pokemon list', () => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Raticate')).toBeInTheDocument();
    });

    it('updates page title to home', async () => {
        expect(document.title).toBe('Jig.js Pokédex | Home');
    });

    it('has the next page button', () => {
      expect(screen.getByText('Next Page')).toBeInTheDocument();
    });

    it('has no previous page button', () => {
      expect(screen.queryByText('Previous Page')).not.toBeInTheDocument();
    });

    it('goes to the next page', async () => {
      fakeList(2, lastPokemonPage);

      screen.getByText('Next Page').click();
      await waitUntil(app, () => app.isInitialRenderFinished());

      expect(await screen.findByText('Togedemaru-totem')).toBeInTheDocument();
    });
  });

  describe('last page', () => {
    beforeEach(async () => {
      fakeList(49, lastPokemonPage);

      (global as any).jsdom.reconfigure({
        url: "http://localhost:3333/pokemon/list/49",
      });

      app = appFactory(window, Platform.browser());

      renderComponent(document.body, app);

      await waitUntil(app, () => app.isInitialRenderFinished());
    });

    it('renders the last page pokemon list', async () => {
      expect(await screen.findByText('Togedemaru-totem')).toBeInTheDocument();
    });

    it('has previous page button', () => {
      expect(screen.getByText('Previous Page')).toBeInTheDocument();
    });

    it('has not the next page button', () => {
      expect(screen.queryByText('Next Page')).not.toBeInTheDocument();
    });

    it('goes to the previous page', async () => {
      fakeList(48, firstPokemonPage);

      screen.getByText('Previous Page').click();
      await waitUntil(app, () => app.isInitialRenderFinished());

      expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
    });

    it('updates page title to page number', async () => {
        expect(document.title).toBe('Jig.js Pokédex | Page 49');
    });
  });
});
