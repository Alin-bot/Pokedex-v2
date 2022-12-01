import { useEffect, useState } from "react";
import { IPokemonItem } from "../../api/model/IPokemon";
import { IPokemonService } from "../../api/IPokeApiService";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { Box, Center, HStack, Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import PokemonHomeCard from "../../components/PokemonHomeCard/PokemonHomeCard";
import { SearchIcon } from '@chakra-ui/icons';

const pokemonService: IPokemonService = new PokeApiServiceImpl();

const HomePage = () => {
  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonsList, setPokemonsList] = useState<IPokemonItem[]>([] as IPokemonItem[]);
  const [page, setPage] = useState<number>(0);
  const [clientInput, setClientInput] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);

      try {
        if (searching) {
          const response = await pokemonService.getPokemonsList(`https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0`)
          setPokemonsList(response)

        } else if(clientInput === ''){
          const response = await pokemonService.getPokemonsList(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${page}`)
          setPokemonsList([])

          if (page === 0) {
            setPokemonsList(response)
          } else {
            setPokemonsList(prevPokemonList => [...prevPokemonList, ...response])
          }
        }
      } catch (error) {
        console.error(`Error on fetching pokemon items: ${error}`);
      } finally {
        setLoadingItems(false);
      }
    };

    console.log(`Page: ${page}, Searching: ${searching}, ClientInput: ${clientInput}`);
    fetchItems();
  }, [page, searching]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(prevPage => prevPage + 30);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function isIncludedInClientInput(value: string) {
    return value.toUpperCase().includes(clientInput.toUpperCase());
  }

  const handleSearch = (input: string) => {
    setClientInput(input);
    console.log(`Input: ${input}`);

    if (input === '') {
      setPage(0)
      setSearching(false)
    } else if (!searching) {
      setPage(0)
      setSearching(true)
    }
  }

  const searchBar =
    <InputGroup ml='100px'
      width={350}>
      <InputLeftElement pointerEvents='none' children={<SearchIcon color='white' />} />
      <Input
        textColor='white'
        placeholder="Search pokemon name or id..."
        value={clientInput}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </InputGroup>

  return (
    <Box bgImage='./blob-scene-haikei.svg' bgRepeat='no-repeat' bgAttachment='fixed' bgSize='cover' pt={70}>
      {searchBar}

      <Center>
        <HStack p='100px' wrap='wrap' gap='100px' w='1100px'>
          {pokemonsList.filter(pokemon =>
            isIncludedInClientInput(pokemon.name) ||
            isIncludedInClientInput(String(pokemon.url.slice(0, -1).match(/[0-9]+$/))))
            .map((item: IPokemonItem, index) => {
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
          <Spinner thickness='4px' emptyColor='gray.200' size='xl' color='#a5a5a5' mb='20px' />
        </HStack>
      }
    </Box>
  );
};

export default HomePage;
