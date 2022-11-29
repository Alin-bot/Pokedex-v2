export interface IPokemon {
    id: number;
    name: string;
    types: [
        {
            type: type
        }
    ]
    weight: number;
}

export interface type {
    name: string;
    url: string;
}

export interface IPokemonItem {
    name: string;
    url: string;
}
