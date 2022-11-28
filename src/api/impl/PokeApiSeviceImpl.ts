import { IPokemon, IPokemonItem } from "../model/IPokemon";
import { IPokemonService } from "../IPokeApiService";
import axios from "axios";

export default class PokeApiServiceImpl implements IPokemonService {
    private readonly baseUrl = "https://pokeapi.co/api/v2";

    public async getPokemonsList(): Promise<IPokemonItem[]> {
        const response = await axios.get(`${this.baseUrl}/pokemon?limit=40&offset=0`);
        return response.data.results;
    }

    public async getPokemonInfo(url: string): Promise<IPokemon> {
        const response = await axios.get(url);
        return response.data;
    }
}