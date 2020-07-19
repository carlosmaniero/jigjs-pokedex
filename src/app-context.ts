import { Subject } from 'jigjs/events/subject';
import { RouterModule } from "jigjs/framework/router/module";
import { Route } from "jigjs/framework/router/router-link";
import { RouterResponse } from 'jigjs/framework/router/routes';
import { TransferState } from "jigjs/framework/transfer-state";
import { JigWindow } from "jigjs/types";
import { Title } from './pages/title';


export class AppContext {
    readonly routes = {
        home: () => {
            return new Route('home');
        },
        pokemonPage: (page: number) => {
            return new Route('pokemon:page', {page: page.toString()});
        }
    }

    readonly style = {
        layoutMaxSize: '1024px',
        viewports: {
            tablet: 'screen and (max-width: 1024px)',
            largeMobile: 'screen and (max-width: 700px)',
            mobile: 'screen and (max-width: 460px)'
        },
        mainHeaderHeight: '75px',
        defaultElementSpace: "20px",
        colors: {
            primary: 'rgba(49,43,75,0.3)',
            primaryAccent: 'rgba(49,43,75,0.6)',
            textColor: "rgba(255, 255, 255, 0.8)"
        }
    }

    readonly title = new Title(this.window);

    readonly events = {
        notFound: new Subject<void>()
    }

    transferState: TransferState;
    currentResponse: RouterResponse;

    constructor(private readonly window: JigWindow, readonly routerModule: RouterModule) {
    }
}
