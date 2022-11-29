import { useEffect, useState } from "react";
import { IPokemonItem } from "../../api/model/IPokemon";
import { IPokemonService } from "../../api/IPokeApiService";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { Center, HStack, Text } from "@chakra-ui/react";
import PokemonHomeCard from "../../components/PokemonHomeCard/PokemonHomeCard";

const pokemonService: IPokemonService = new PokeApiServiceImpl();

const HomePage = () => {
  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonsList, setPokemonsList] = useState<IPokemonItem[]>([] as IPokemonItem[]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);

      try {
        const response = await pokemonService.getPokemonsList(`https://pokeapi.co/api/v2/pokemon?limit=27&offset=${page}`);

        setPokemonsList(prevPokemonList => [...prevPokemonList, ...response]);

      } catch (error) {
        console.error(`Error on fetching pokemon items: ${error}`);
      } finally {
        setLoadingItems(false);
      }
    };
    fetchItems();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(prevPage => prevPage + 20);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Center bg='#313638'>
        <HStack p='100px' wrap='wrap' gap='100px' w='1050px'>
          {pokemonsList.map((item: IPokemonItem, index) => {
            return (
              <PokemonHomeCard
                pokemonName={item.name}
                url={item.url}
                key={index}
              />)
          })}
        </HStack>
      </Center>
      {loadingItems && <Text>Loading...</Text>}
    </>
  );
};

export default HomePage;
