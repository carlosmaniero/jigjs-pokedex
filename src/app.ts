import { App, AppFactory } from "jigjs/framework/app/app";
import { RouterModule } from "jigjs/framework/router/module";
import { AppContext } from "./app-context";
import { configureRouter } from './routing';


export const appFactory: AppFactory = (window, platform) => {
    const routerModule = new RouterModule(window, platform);
    const context = new AppContext(window, routerModule);

    configureRouter(context);

    return new App(routerModule)
}
