import react, { useEffect, useState } from "react";

import { IPokemonItem } from "../../api/model/IPokemon";
import { IPokemonService } from "../../api/IPokeApiService";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { HStack, Stack, Text } from "@chakra-ui/react";
import PokemonHomeCard from "../../components/PokemonHomeCard/PokemonHomeCard";

const pokemonService: IPokemonService = new PokeApiServiceImpl();

const HomePage = () => {
  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonsList, setPokemonsList] = useState<IPokemonItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);

      try {
        const response = await pokemonService.getPokemonsList();

        setPokemonsList(response);
      } catch (error) {
        console.error(`Error on fetching pokemon items: ${error}`);
      }

      setLoadingItems(false);
    };
    fetchItems();
  }, []);

  return loadingItems ? (
    <Text>Loading...</Text>
  ) : (
    <HStack p='100px' wrap='wrap' gap='100px'>
      {pokemonsList.map((item: IPokemonItem) => (
        <PokemonHomeCard
          pokemonName={item.name}
          url={item.url}
          key={item.name}
        />
      ))}
    </HStack>
  );
};

export default HomePage;
