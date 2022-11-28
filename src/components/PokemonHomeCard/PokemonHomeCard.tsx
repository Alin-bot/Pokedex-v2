import { Box, Center, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { IPokemonService } from "../../api/IPokeApiService";
import { IPokemon, type } from "../../api/model/IPokemon";
import { renderPokemoneName, renderPokemonId } from "../../resources/HelpingFunctions";

const pokemonService: IPokemonService = new PokeApiServiceImpl();

type Props = {
    pokemonName: string;
    url: string;
};

const getTypes = (types: type[]) => {
    return (
        <Center mt='20px'>
            {types.map((type: type) => (
                <Box mr='10px'>
                    <Text key={type.name} color='white'>{type.name}</Text>
                </Box>
            ))}
        </Center>
    )
}

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
        <Box bg='#a5a5a5'
            w="200px"
            h="120px"
            borderRadius="20px"
            shadow='13px 13px 26px #1e2122, 5px 5px 26px #444b4e'
        >
            <Text
                color='white'
                ml='12px'
                mt='5px'
            >
                {renderPokemonId(pokemon.id)}
            </Text>

            <Center h='10px' position='relative' bottom='40px'>
                <Image
                    src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemonName}.gif`}
                    alt={pokemonName}
                />
            </Center>

            <Center>
                <Text color='white' mt='5px'>{renderPokemoneName(pokemon.name)}</Text>
            </Center>

            {getTypes(pokemon.types.map(obj => obj.type))}
        </Box>
    );
};

export default PokemonHomeCard;
