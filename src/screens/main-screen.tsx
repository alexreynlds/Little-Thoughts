import * as React from 'react'
import { Text, Box, VStack, useColorModeValue } from 'native-base'
import Masthead from '../components/masthead'
import AnimatedColourBox from '../components/animated-colour-box'
import { Canvas } from '@react-three/fiber'

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
            {/* <VStack space={5} alignItems="center">
                <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
                    <Text>Hello</Text>
                </Box>
                <Canvas>
                    <mesh>
                        <sphereGeometry />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>
                </Canvas>
            </VStack> */}
            <Canvas>
                <mesh>
                    <sphereGeometry />
                    <ambientLight />
                    <meshStandardMaterial color="hotpink" />
                </mesh>
            </Canvas>
        </AnimatedColourBox>
    )
}
