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
import ThemeToggle from '../components/theme-toggle'

const OptionsScreen = () => {
    return (
        <AnimatedColourBox
            flex={1}
            bg={useColorModeValue('yellow.50', 'primary.900')}
            w="full"
            pt={20}
        >
            <VStack space={5} alignItems="center" flex={1}>
                <Heading pb={'1/6'}>Options</Heading>
                <ThemeToggle />
                {/* Music Slider */}
                <Box h="50px" w="1/2" m={5}>
                    <Text alignSelf={'center'}>Music Volume</Text>
                    <Slider w="full" defaultValue={70}>
                        <Slider.Track>
                            <Slider.FilledTrack />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider>
                </Box>
                {/* SFX Slider */}
                <Box h="50" w="1/2" m={5}>
                    <Text alignSelf={'center'}>SFX Volume</Text>
                    <Slider w="full" defaultValue={70}>
                        <Slider.Track>
                            <Slider.FilledTrack />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider>
                </Box>
            </VStack>
        </AnimatedColourBox>
    )
}

export default OptionsScreen
