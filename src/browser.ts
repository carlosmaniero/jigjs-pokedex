import {renderComponent} from "jigjs/components";
import {appFactory} from "./app";
import { Platform } from 'jigjs/framework/platform';

renderComponent(document.querySelector('#root'), appFactory(window, Platform.browser()));
