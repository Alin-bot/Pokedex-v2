import { useEffect, useState } from "react";
import { IPokemonItem } from "../../api/model/IPokemon";
import { IPokemonService } from "../../api/IPokeApiService";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { Center, HStack, Spinner } from "@chakra-ui/react";
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
        const response = await pokemonService.getPokemonsList(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${page}`);

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
    setPage(prevPage => prevPage + 30);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Center bgImage='./blob-scene-haikei.svg' bgRepeat='no-repeat' bgAttachment='fixed' bgSize='cover'>
        <HStack p='100px' wrap='wrap' gap='100px' w='1100px'>
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
      {loadingItems &&
        <HStack justify='center' align='center'>
          <Spinner thickness='4px' emptyColor='gray.200' size='xl' color='#a5a5a5' />
        </HStack>
      }
    </>
  );
};

export default HomePage;
