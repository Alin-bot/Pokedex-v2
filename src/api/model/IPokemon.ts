export interface IPokemon {
    id: number;
    name: string;
    types: [
        {
            slot: string,
            type: { name: string, url: string }
        }
    ]
    weight: number;
}

export interface IPokemonItem {
    name: string;
    url: string;
}