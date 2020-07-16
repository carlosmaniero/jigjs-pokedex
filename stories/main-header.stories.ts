import {createTestContext} from "../src/__tests__/context";
import {storybookRender} from "./render-storybook";
import {MainHeader} from "../src/components/ui/main-header";

export default { title: 'Main Header' };

export const header = () => {
  const context = createTestContext();

  return storybookRender(context, new MainHeader(context));
}
