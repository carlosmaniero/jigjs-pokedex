export class Title {
    constructor(private readonly window: Window) {}

    set(title: string) {
        this.window.document.title = `Jig.js Pokédex | ${title}`;
    }
}