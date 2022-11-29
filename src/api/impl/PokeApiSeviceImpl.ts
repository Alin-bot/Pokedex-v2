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
}