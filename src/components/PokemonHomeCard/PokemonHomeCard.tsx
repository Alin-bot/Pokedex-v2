import { Box, Center, Image, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PokeApiServiceImpl from "../../api/impl/PokeApiSeviceImpl";
import { IPokemonService } from "../../api/IPokeApiService";
import { IPokemon } from "../../api/model/IPokemon";
import { getCardColor, renderPokemoneName, renderPokemonId } from "../../resources/HelpingFunctions";
import TypeBox from "../TypeBox/TypeBox";

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

    const width = '210px';
    const height = '120px';
    const radius = '20px';

    return loadingItems ? (
        <Skeleton width={width} height={height} borderRadius={radius} />
    ) : (
        <Box
            bg='#8d99ae'
            w={width}
            h={height}
            borderRadius={radius}
            borderWidth='3px'
            borderColor={getCardColor(pokemon.types[0].type.name)}
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
                    fallback={
                        // <Image src={pokemon.sprites.other["official-artwork"].front_default} height='70' /> ||
                        <Image src='./poke-egg.png' height='50px' />
                    }
                />
            </Center>

            <Center>
                <Text color='white' mt='5px'>{renderPokemoneName(pokemon.name)}</Text>
            </Center>

            <Center mt='10px' gap='1'>
                {pokemon.types.map((obj, index) =>
                    <TypeBox typeName={obj.type.name} key={index} />
                )}
            </Center>

        </Box>
    );
};

export default PokemonHomeCard;
