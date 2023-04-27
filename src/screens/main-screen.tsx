import * as React from 'react'
import {
    Center,
    Text,
    Box,
    VStack,
    themeTools,
    useTheme,
    useColorMode,
    useColorModeValue
} from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'
import AnimatedColourBox from '../components/animated-colour-box'

export default function MainScreen() {
    return (
        <AnimatedColourBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w="full"
        >
            <Masthead title="Hello" image={require('../assets/testimage.jpeg')}>
                <Text></Text>
            </Masthead>
            <VStack space={5} alignItems="center">
                <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
                    <Text>Hello</Text>
                </Box>
            </VStack>
        </AnimatedColourBox>
    )
}
