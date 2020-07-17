import { component, html } from 'jigjs/components';
import { AppContext } from '../../app-context';
import { PokemonService } from '../../services/pokemon-service';
import { PokeDetail } from '../../components/poke-detail';
import { observing } from 'jigjs/reactive';

@component()
export class PokemonDetailPage {
    @observing()
    private pokemonDetail: PokeDetail;

    constructor(private readonly context: AppContext, private readonly slug) {
        new PokemonService(this.context)
            .fetchPokemon(this.slug, (_, pokemon) => {
                this.context.title.set(pokemon.name);
                this.pokemonDetail = new PokeDetail(context, pokemon);
            });
    }

    render() {
        return html`${this.pokemonDetail}`;
    }

    get isLoading() {
        return !this.pokemonDetail;
    }
}