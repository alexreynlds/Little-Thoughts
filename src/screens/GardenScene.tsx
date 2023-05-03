import React from "react"
import { Text, Box, VStack, Heading, useColorModeValue, Slider, Center, View } from "native-base"
import { useColorMode } from "native-base"
import { auth } from "../../firebase"

const GardenScene = () => {
    return (
        <Box safeArea bg={useColorModeValue("primary.50", "primary.900")}>
            <View>
                <Box></Box>
                <Center p={5} h="100%">
                    <Heading size="xl" mb={20}>
                        Welcome back: {auth.currentUser?.displayName}!
                    </Heading>
                    <Text>Email: {}</Text>
                </Center>
            </View>
        </Box>
    )
}

export default GardenScene
