import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { renderPokemonTypeName } from '../../resources/HelpingFunctions'

type Props = {
    typeName: string
}

const TypeBox = (props: Props) => {
    const { typeName } = props

    return (
        <HStack bg='#edf2f4' borderRadius='md' p='1'>
            <Box mr='-10px'>
                <Image
                    src={`/type_icons/${typeName}.svg`}
                    alt="prop"
                    w="15px"
                    mr="5px"
                />
            </Box>

            <Box textColor='black'>
                <Text>{renderPokemonTypeName(typeName)}</Text>
            </Box>
        </HStack>
    )
}

export default TypeBox