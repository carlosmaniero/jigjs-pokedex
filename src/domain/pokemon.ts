export class PokemonBasicDetail {
  constructor(
    readonly id: number,
    readonly name: string) {
  }

  get sprite() {
    return `https://img.pokemondb.net/sprites/home/normal/${this.slug}.png`
  }

  get slug() {
    return this.name.toLowerCase()
  }
}

export interface PokemonSkills {
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number
}

export class Pokemon {
  constructor(private readonly basicDetail: PokemonBasicDetail, readonly skills: PokemonSkills, readonly sprites: string[] = []) {
  }

  get name() {
    return this.basicDetail.name
  }

  get id() {
    return this.basicDetail.id;
  }

  get sprite() {
    return this.basicDetail.sprite;
  }

  get slug() {
    return this.basicDetail.slug;
  }
}