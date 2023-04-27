import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MainScreen from './screens/main-screen'
import OptionsScreen from './screens/options-screen'
import LibraryScreen from './screens/library-screen'
import ShopScreen from './screens/shop-screen'
import GardenScreen from './screens/garden-screen'
import { FontAwesome } from '@expo/vector-icons'
import { useColorModeValue, Icon } from 'native-base'

const Tab = createMaterialBottomTabNavigator()

const App = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="history"
            activeColor="#f0edf6"
            inactiveColor="grey"
            barStyle={{ backgroundColor: '#694fad' }}
            shifting={true}
            labeled={true}
        >
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            as={FontAwesome}
                            name="home"
                            size={6}
                            color={useColorModeValue('black', 'white')}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Garden"
                component={GardenScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            as={FontAwesome}
                            name="leaf"
                            size={6}
                            color={useColorModeValue('black', 'white')}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            as={FontAwesome}
                            name="book"
                            size={6}
                            color={useColorModeValue('black', 'white')}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Shop"
                component={ShopScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            as={FontAwesome}
                            name="money"
                            size={6}
                            color={useColorModeValue('black', 'white')}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Options"
                component={OptionsScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            as={FontAwesome}
                            name="cog"
                            size={6}
                            color={useColorModeValue('black', 'white')}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default App
