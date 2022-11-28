import { IPokemon, IPokemonItem } from "./model/IPokemon";

export interface IPokemonService {
    getPokemonsList(): Promise<IPokemonItem[]>;
    getPokemonInfo(url: string): Promise<IPokemon>;
}