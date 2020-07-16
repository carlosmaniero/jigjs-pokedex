import { App } from "jigjs/framework/app/app";
import { fakeDetail } from "../../__tests__/contracts/pokeapi/fake-pokeapi";
import { Platform } from "jigjs/framework/patform/platform";
import { appFactory } from "../../app";
import { renderComponent } from "jigjs/components";
import { waitUntil } from "jigjs/reactive";
import { screen } from "@testing-library/dom";

describe('Pokemon Detail Page', () => {
    let app: App;

    beforeEach(async () => {
        (global as any).jsdom.reconfigure({
            url: "http://localhost:3333/pokemon/bulbasaur",
          });

        fakeDetail('bulbasaur');
        app = appFactory(window, Platform.browser());
        renderComponent(document.body, app);
        await waitUntil(app, () => app.isInitialRenderFinished());
    });

    it('renders the pokemon information', async () => {
        expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
        expect(await screen.findByText('45')).toBeInTheDocument();
        expect(await screen.findByText('50')).toBeInTheDocument();
        expect(await screen.findByText('49')).toBeInTheDocument();
        expect(await screen.findByText('65')).toBeInTheDocument();
        expect(await screen.findByText('67')).toBeInTheDocument();
        expect(await screen.findByText('44')).toBeInTheDocument();
    });
});
