import { IPokemon, IPokemonItem } from "../model/IPokemon";
import { IPokemonService } from "../IPokeApiService";
import axios from "axios";



export default class PokeApiServiceImpl implements IPokemonService {
    public async getPokemonsList(url: string): Promise<IPokemonItem[]> {
        const response = await axios.get(url);
        return response.data.results;
    }

    public async getPokemonInfo(url: string): Promise<IPokemon> {
        const response = await axios.get(url);
        return response.data;
    }

    public async getPokemonListByType(type: string): Promise<IPokemonItem[]> {
        const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        return response.data.pokemon.map((obj: { pokemon: IPokemonItem }) => obj.pokemon);
    }

    public async getPokemonTypes(): Promise<string[]> {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        return response.data.results.map((type: { name: string; }) => type.name).splice(0, response.data.results.length - 2);
    }
}