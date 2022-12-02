import { useEffect, useState } from "react";
import { IPokemonItem } from "../../api/model/IPokemon";
import { IPokemonService } from "../../api/IPokeApiService";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { Box, Center, HStack, Select, Spinner } from "@chakra-ui/react";
import PokemonHomeCard from "../../components/PokemonHomeCard/PokemonHomeCard";
import { renderPokemoneName } from "../../resources/HelpingFunctions";

const pokemonService: IPokemonService = new PokeApiServiceImpl();

const HomePage = () => {
  const [loadingItems, setLoadingItems] = useState(true);
  const [pokemonsList, setPokemonsList] = useState<IPokemonItem[]>(
    [] as IPokemonItem[]
  );
  const [page, setPage] = useState<number>(0);

  const [loadingTypes, setLoadingTypes] = useState(true);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("");

  const [enableInfinitScroll, setEnableInfinitScroll] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);

      try {
        const response = await pokemonService.getPokemonsList(
          `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${page}`
        );

        setPokemonsList((prevPokemonList) => [...prevPokemonList, ...response]);
      } catch (error) {
        console.error(`Error on fetching pokemon items: ${error}`);
      } finally {
        setLoadingItems(false);
      }
    };
    fetchItems();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 30);
  };

  useEffect(() => {
    if (enableInfinitScroll) {
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [enableInfinitScroll]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);

      try {
        const response = await pokemonService.getPokemonListByType(
          selectedType
        );

        setPokemonsList(response);
      } catch (error) {
        console.error(`Error on fetching pokemon items: ${error}`);
      } finally {
        setLoadingItems(false);
      }
    };

    if (selectedType !== "") {
      if (selectedType === "All") {
        setEnableInfinitScroll(true);
        setPokemonsList([]);
        setPage(0);
      } else {
        setEnableInfinitScroll(false);
        setPage(-1);
        fetchItems();
      }
    }
  }, [selectedType]);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoadingTypes(true);

      try {
        const response = await pokemonService.getPokemonTypes();

        setTypes(response);
      } catch (error) {
        console.error(`Error on fetching pokemon items: ${error}`);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchTypes();
  }, []);

  return (
    <Box
      bgImage="./blob-scene-haikei.svg"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      bgSize="cover"
      pt="50"
      minH="100vh"
    >
      {loadingTypes ? (
        <Spinner />
      ) : (
        <Select
          placeholder="Select option"
          textColor="white"
          w="200px"
          ml="100"
          onChange={(event) => setSelectedType(event.target.value)}
        >
          <option value="All">All</option>

          {types.map((type) => (
            <option value={type} key={type}>
              {renderPokemoneName(type)}
            </option>
          ))}
        </Select>
      )}

      <Center>
        <HStack p="100px" wrap="wrap" gap="100px" w="1100px">
          {pokemonsList.map((item: IPokemonItem, index) => {
            return (
              <PokemonHomeCard
                pokemonName={item.name}
                url={item.url}
                key={index}
              />
            );
          })}
        </HStack>
      </Center>

      {loadingItems && (
        <HStack justify="center" align="center">
          <Spinner
            thickness="4px"
            emptyColor="gray.200"
            size="xl"
            color="#a5a5a5"
            mb="20px"
          />
        </HStack>
      )}
    </Box>
  );
};

export default HomePage;
