import { Platform } from "jigjs/framework/patform/platform";
import { RouterModule } from "jigjs/framework/router/module";
import { TransferState } from "jigjs/framework/transfer-state";
import { AppContext } from "../app-context";
import { configureRouter } from '../routing';

export const createTestContext = () => {
    const appContext = new AppContext(window, new RouterModule(window, Platform.browser()));
    
    appContext.transferState = new TransferState();
    configureRouter(appContext);

    return appContext;
}
