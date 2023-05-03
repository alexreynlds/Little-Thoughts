import React, { useContext } from "react"
import { Text, Box, VStack, Heading, useColorModeValue, View, Center, Button } from "native-base"
import { AppContext, AppContextType } from "../AppContext"
import { useColorMode } from "native-base"
import { auth } from "../../firebase"

const ShopScreen = () => {
    const { coins, setCoins } = useContext<AppContextType>(AppContext)

    const testClick = () => {
        setCoins(coins + 1)
    }

    return (
        <Box safeArea bg={useColorModeValue("primary.50", "primary.900")}>
            <View>
                <Box></Box>
                <Center p={5} h="100%">
                    <Heading>Store</Heading>
                    <Heading size="sm" mb={20}>
                        Welcome back: {auth.currentUser?.displayName}!
                    </Heading>
                    <Text fontSize={18}>Coins: {coins}</Text>
                    <Button onPress={testClick}>Add Money</Button>
                </Center>
            </View>
        </Box>
    )
}

export default ShopScreen
