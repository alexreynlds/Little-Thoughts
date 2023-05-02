// import * as React from 'react'
import React, { useContext } from 'react'
import { Text, Box, VStack, useColorModeValue, Button } from 'native-base'
import Masthead from '../components/masthead'
import AnimatedColourBox from '../components/animated-colour-box'
import { Canvas } from '@react-three/fiber'
import { AppContext, AppContextType } from '../app-context'

export default function MainScreen() {
    const { coins, setCoins } = useContext<AppContextType>(AppContext)

    const testClick = () => {
        setCoins(coins + 1)
    }

    return (
        <AnimatedColourBox
            flex={1}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            w="full"
        >
            <Masthead title="Hello" image={require('../assets/testimage.jpeg')}>
                <Text></Text>
            </Masthead>
            <Text>Coins: {coins}</Text>
            <Button onPress={testClick}>test</Button>
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
