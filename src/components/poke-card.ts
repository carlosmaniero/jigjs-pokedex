import { component, html } from "jigjs/components";
import { Route, RouteLinkElement, RouterLink } from 'jigjs/framework/router/router-link';
import { AppContext } from "../app-context";
import { PokemonBasicDetail } from "../domain/pokemon";
import { JigCssClass, css } from 'jigcss';

@component()
export class PokeCard {
    private readonly cardClass: JigCssClass;
    pokemonLink: RouterLink;

    constructor(private readonly context: AppContext, private readonly pokemon: PokemonBasicDetail) {
        this.cardClass = css`
            & {
                background-color: rgba(41,38,50,0.3);
                border: 10px solid ${this.context.style.colors.primary};
                color: ${this.context.style.colors.textColor};
                border-radius: 20px;
                padding: 20px;
                text-align: center;
                transition: all 0.25s;
                text-decoration: none;
                display: block;
            }

            &:hover {
                background-color: rgba(41,38,50,0.6);
            }
        `;

        this.pokemonLink = this.context.routerModule.linkFactory.createLink(
            new Route('pokemon:detail', {slug: pokemon.slug}), 
            new RouteLinkElement(this.pokemonCardBody(), {class: this.cardClass})
        );
    }

    render() {
        return html`${this.pokemonLink}`;
    }

    private pokemonCardBody() {
        return html`
            <img width="128px" height="128px" alt="${this.pokemon.name}" src="${this.pokemon.sprite}" />
            <h2>${this.pokemon.name}</h2>
        `;
    }
}
