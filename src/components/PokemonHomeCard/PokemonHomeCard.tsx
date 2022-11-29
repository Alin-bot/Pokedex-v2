import { Box, Center, Image, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

                setPokemon(response);

            } catch (error) {
                console.error(`Error on fetching pokemon: ${error}`);
            } finally {
                setLoadingItems(false);
            }
        };
        fetchItems();
    }, [url]);

    const width = '200px';
    const height = '120px';
    const radius = '20px';

    return loadingItems ? (
        <Skeleton width={width} height={height} borderRadius={radius}/>
    ) : (
        <Box
            bg='#a5a5a5'
            w={width}
            h={height}
            borderRadius={radius}
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

            <Center mt='20px'>
                {pokemon.types.map((obj, index) =>
                    <Box mr='10px' key={index}>
                        <Text color='white'>{obj.type.name}</Text>
                    </Box>
                )}
            </Center>

        </Box>
    );
};

export default PokemonHomeCard;
