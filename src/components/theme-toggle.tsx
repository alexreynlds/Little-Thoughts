import React from 'react'
import {
    Text,
    HStack,
    Switch,
    useColorMode,
    useColorModeValue,
    Icon
} from 'native-base'
import { FontAwesome } from '@expo/vector-icons'

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <HStack alignItems="center" justifyContent="space-between" space={2}>
            <Icon
                as={FontAwesome}
                name="sun-o"
                size={7}
                color={useColorModeValue('black', 'white')}
            />
            <Switch
                onToggle={toggleColorMode}
                isChecked={colorMode === 'dark'}
            />
            <Icon
                as={FontAwesome}
                name="moon-o"
                size={7}
                color={useColorModeValue('black', 'white')}
            />
        </HStack>
    )
}
