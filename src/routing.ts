import { RouterRender, RouterResponse } from "jigjs/framework/router/routes";
import { TransferState } from 'jigjs/framework/transfer-state';
import { AppContext } from './app-context';
import { MainTemplate } from './pages/template/template';
import { PokemonList } from './pages/pokemon-list/pokemon-list';
import { PokemonDetailPage } from './pages/pokemon-detail/pokemon-detail';
import { NotFound } from './pages/not-found/not-found';

export const configureRouter = (context: AppContext) => {
    const mainTemplate = new MainTemplate(context);

    const handlePokemonList = async (page: number, render: RouterRender, transferState: TransferState) => {
        context.transferState = transferState;
        render(mainTemplate);

        await mainTemplate.updateComponent(new PokemonList(context, page));
    }

    context.routerModule.routes.handle({
        path: '/',
        name: 'home',
        async handler(_params, render, transferState, response) {
            context.currentResponse = response;

            await handlePokemonList(1, render, transferState);
        }
    });

    context.routerModule.routes.handle({
        path: '/pokemon/list/:page',
        name: 'pokemon:page',
        async handler(params: {page: string}, render: RouterRender, transferState: TransferState, response: RouterResponse) {
            context.currentResponse = response;

            const page = parseInt(params.page);

            if (page === 1) {
                context.routerModule.history.push('/');
                return;
            }

            await handlePokemonList(page, render, transferState);
        }
    });

    context.routerModule.routes.handle({
        path: '/pokemon/:slug',
        name: 'pokemon:detail',
        async handler(params: {slug: string}, render, transferState, response) {
            context.currentResponse = response;

            context.transferState = transferState;
            render(mainTemplate);
            await mainTemplate.updateComponent(new PokemonDetailPage(context, params.slug));
        }
    });

    context.routerModule.routes.handle404(async (url, render, transferState, response) => {
        context.currentResponse = response;
        context.transferState = transferState;
        render(mainTemplate);
        await mainTemplate.updateComponent(new NotFound(context));
    })
}