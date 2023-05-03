import React from "react"
import { Text, HStack, Switch, useColorMode, useColorModeValue, Icon, useControllableProp } from "native-base"
import { FontAwesome } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()

    const getInfo = async () => {
        const tempColorMode = await AsyncStorage.getItem("storedColorMode")
        return tempColorMode
    }

    const setInfo = async () => {}

    const doToggle = () => {
        toggleColorMode()
        AsyncStorage.setItem("storedColorMode", colorMode === "dark" ? "light" : "dark")
    }

    return (
        <HStack alignItems="center" justifyContent="space-between" space={2}>
            <Icon as={FontAwesome} name="sun-o" size={7} color={useColorModeValue("black", "white")} />
            <Switch onToggle={doToggle} isChecked={colorMode === "dark"} />
            <Icon as={FontAwesome} name="moon-o" size={7} color={useColorModeValue("black", "white")} />
        </HStack>
    )
}
