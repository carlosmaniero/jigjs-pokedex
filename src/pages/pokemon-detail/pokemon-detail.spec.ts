import { App } from "jigjs/framework/app/app";
import { waitUntil } from "jigjs/reactive";
import { Platform } from "jigjs/framework/platform";
import { fakeDetail } from "../../__tests__/contracts/pokeapi/fake-pokeapi";
import { appFactory } from "../../app";
import { renderComponent } from "jigjs/components";
import { screen } from "@testing-library/dom";


describe('Pokemon Detail Page', () => {
    let app: App;

    describe('returns pokemon detail page', () => {
        beforeEach(async () => {
            (global as any).jsdom.reconfigure({
                url: "http://localhost:3333/pokemon/bulbasaur",
            });

            fakeDetail('bulbasaur');
            app = appFactory(window, Platform.browser());
            renderComponent(document.body, app);
            await waitUntil(app, () => app.isInitialRenderFinished());
        });

        it('renders the pokemon information', () => {
            expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
            expect(screen.getByText('45')).toBeInTheDocument();
            expect(screen.getByText('50')).toBeInTheDocument();
            expect(screen.getByText('49')).toBeInTheDocument();
            expect(screen.getByText('65')).toBeInTheDocument();
            expect(screen.getByText('67')).toBeInTheDocument();
            expect(screen.getByText('44')).toBeInTheDocument();
        });

        it('updates page title', async () => {
            expect(document.title).toBe('Jig.js Pokédex | Bulbasaur');
        });
    });

    describe('handling error', () => {
        it('returns page not found', async () => {
            (global as any).jsdom.reconfigure({
                url: "http://localhost:3333/pokemon/lala",
            });

            fakeDetail('lala', "not found", 404);

            app = appFactory(window, Platform.browser());
            renderComponent(document.body, app);
            await waitUntil(app, () => app.isInitialRenderFinished());

            expect(document.body.textContent).toContain('Page not found');
            expect(app.latestResponse.statusCode).toBe(404);
        });
    });
});
