import { IPokemon, IPokemonItem } from "./model/IPokemon";

export interface IPokemonService {
    getPokemonsList(url: string): Promise<IPokemonItem[]>;
    getPokemonInfo(url: string): Promise<IPokemon>;
    getPokemonListByType(type: string): Promise<IPokemonItem[]>;

    getPokemonTypes(): Promise<string[]>;
}