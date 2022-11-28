import { Box, Center, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { IPokemonService } from "../../api/IPokeApiService";
import { IPokemon } from "../../api/model/IPokemon";
import { renderPokemoneName, renderPokemonId } from "../../resources/HelpingFunctions";

const pokemonService: IPokemonService = new PokeApiServiceImpl();

type Props = {
    pokemonName: string;
    url: string;
};

const PokemonHomeCard = (props: Props) => {
    const { pokemonName, url } = props;
    const [loadingItems, setLoadingItems] = useState(true);
    const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon);

    useEffect(() => {
        const fetchItems = async () => {
            setLoadingItems(true);

            try {
                const response = await pokemonService.getPokemonInfo(url);
                console.log(response);

                setPokemon(response);
            } catch (error) {
                console.error(`Error on fetching pokemon: ${error}`);
            }

            setLoadingItems(false);
        };
        fetchItems();
    }, []);

    return loadingItems ? (
        <Text>Loading...</Text>
    ) : (
        <Box bg="blackAlpha.600" w="200px" h="100px" borderRadius="3xl">
            <Text color='white' ml='12px' mt='5px'>{`ID: ${renderPokemonId(pokemon.id)}`}</Text>
            <Center h='10px' position='relative' bottom='40px'>
                <Image
                    src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemonName}.gif`}
                    alt={pokemonName}
                />
            </Center>
            <Center>
                <Text color='white' mt='5px'>{renderPokemoneName(pokemon.name)}</Text>
            </Center>
        </Box>
    );
};

export default PokemonHomeCard;
