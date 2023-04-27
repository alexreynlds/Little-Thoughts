import React from 'react'
import AnimatedColourBox from '../components/animated-colour-box'
import {
    Text,
    Box,
    VStack,
    Heading,
    useColorModeValue,
    Slider
} from 'native-base'

const LibraryScreen = () => {
    return (
        <AnimatedColourBox
            flex={1}
            bg={useColorModeValue('yellow.50', 'primary.900')}
            w="full"
            pt={20}
        >
            <VStack space={5} alignItems="center" flex={1}>
                <Heading pb={'1/6'}>Library</Heading>
            </VStack>
        </AnimatedColourBox>
    )
}

export default LibraryScreen
