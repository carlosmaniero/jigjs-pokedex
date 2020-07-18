import { component, html } from 'jigjs/components';
import { AppContext } from '../../app-context';
import { Route, RouteLinkElement, RouterLink } from 'jigjs/framework/router/router-link';

@component()
export class NotFound {
    private readonly notFoundClass: string;
    private readonly homeLink: RouterLink;

    constructor(context: AppContext) {
        context.currentResponse.statusCode = 404;
        this.notFoundClass = context.css.style({
            '&': {
                color: '#fff',
                margin: '0 auto',
                maxWidth: context.style.layoutMaxSize
            },
            '& .title': {
                display: 'flex',
            },
            '@media': {
                [context.style.viewports.tablet]: {
                    '&': {
                        padding: context.style.defaultElementSpace
                    },
                }
            }
        });

        this.homeLink = context.routerModule.linkFactory.createLink(
            context.routes.home(),

            new RouteLinkElement('back to home', {class: context.css.style({
                '&': {
                    color: 'rgba(125, 127, 219, 1)'
                }
            })})
        )
    }

    render() {
        return html`
            <div class="${this.notFoundClass}">
                <div class="title">
                    <h1>Page not found go ${this.homeLink}</h1>

                    <div>
                        <img src="https://img.pokemondb.net/sprites/home/normal/psyduck.png" alt="not found psyduck">
                    </div>
                </div>
            </div>
        `;
    }

    get isLoading() {
        return false;
    }
}