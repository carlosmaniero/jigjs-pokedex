import { component, html } from 'jigjs/components';
import { Pokemon } from '../domain/pokemon';
import { AppContext } from '../app-context';
import { JigCssClass, css } from 'jigcss';

@component()
export class PokeDetail {
    private readonly cssClass: JigCssClass;

    constructor(private readonly context: AppContext, private readonly pokemon: Pokemon) {
        this.cssClass = css`
            & {
                margin: 0 auto;
                max-width: ${context.style.layoutMaxSize};
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                padding-top: ${context.style.defaultElementSpace};
            }

            & .title-wrapper {
                display: flex;
                color: #FFFFFF;
                align-items: center
            }

            & .title-wrapper h1 {
                margin: 0
            }

            & .skills .skill {
                display: inline-flex;
                color: #FFFFFF;
                align-items: center;
                margin-right: 10px
            }

            & .skills .skill svg {
                margin-right: 5px;
            }

            & .skills .skill span {
                display: flex;
                align-items: center;
                color: rgba(255, 255, 255, 0.3);
                margin-right: 5px
            }

            @media ${this.context.style.viewports.tablet} {
                & {
                    display: block;
                    padding: ${this.context.style.defaultElementSpace}
                };
                & .skills {
                    margin-top: ${this.context.style.defaultElementSpace}
                };
                & .sprites {
                    overflow: auto;
                    white-space: nowrap;
                }
            }
        `;
    }

    render() {
        return html`
            <div class="${this.cssClass}">
                <div>
                    <div class="title-wrapper">
                        <img src="${this.pokemon.sprite}" alt="${this.pokemon.name}">
                        <h1>${this.pokemon.name}</h1>
                    </div>

                    <div class="sprites">
                        ${this.pokemon.sprites.map(sprite => html`<img src="${sprite}">`)}
                    </div>
                </div>

                <section class="skills">
                    <div class="skill">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"/><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" fill="rgba(181,47,91,1)"/></svg>
                            HP: 
                        </span>
                        <strong>
                            ${this.pokemon.skills.hp}
                        </strong>
                    </div>
                    <div class="skill">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47-1.667 1.647-2.933 2.47-3.8 2.47 3.995-7 1.8-10-4.2-14 .5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23zm.71-17.765c3.241 2.75 3.257 4.887.753 9.274-.761 1.333.202 2.991 1.737 2.991.688 0 1.384-.2 2.119-.595a5.5 5.5 0 1 1-9.087-5.412c.126-.118.765-.685.793-.71.424-.38.773-.717 1.118-1.086 1.23-1.318 2.114-2.78 2.566-4.462z" fill="rgba(230,126,34,1)"/></svg>
                            Attack:
                        </span>
                        <strong>
                            ${this.pokemon.skills.attack}
                        </strong>
                    </div>
                    <div class="skill">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM5 4.604v9.185a4 4 0 0 0 1.781 3.328L12 20.597l5.219-3.48A4 4 0 0 0 19 13.79V4.604L12 3.05 5 4.604z" fill="rgba(19,128,103,1)"/></svg>
                            Defense:
                        </span>
                        <strong>
                            ${this.pokemon.skills.defense}
                        </strong>
                    </div>
                    <div class="skill">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13 9h8L11 24v-9H4l9-15v9zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11z"  fill="rgba(23,105,159,1)"/></svg>
                            Speed:
                        </span>
                        <strong>
                            ${this.pokemon.skills.speed}
                        </strong>
                    </div>
                    <div class="skill">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z" fill="rgba(230,126,34,1)"/></svg>
                            Special Attack:
                        </span>
                        <strong>
                            ${this.pokemon.skills.specialAttack}
                        </strong>
                    </div>
                    <div class="skill">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976zM13 10V5l-5 7h3v5l5-7h-3z" fill="rgba(19,128,103,1)"/></svg>
                            Special Defense:
                        </span>
                        <strong>
                            ${this.pokemon.skills.specialDefense}
                        </strong>
                    </div>
                </section>
            </div>
        `;
    }
}