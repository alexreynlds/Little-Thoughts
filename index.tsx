// @ts-nocheck
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useColorModeValue, Icon } from "native-base"
import OptionsScreen from "./src/screens/LoginScreen"
import HomeScreen from "./src/screens/HomeScreen"
import LibraryScreen from "./src/screens/LibraryScreen"
import SettingsScreen from "./src/screens/SettingsScreen"
import { auth } from "./firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import React, { useEffect, useState, useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import ShopScreen from "./src/screens/ShopScreen"
import GardenScene from "./src/screens/GardenScene"
import { Ionicons } from "@expo/vector-icons"
import { useColorMode } from "native-base"

// import TrackPlayer from "react-native-track-player"

// // AppRegistry.registerComponent(...);
// TrackPlayer.registerPlaybackService(() => require("./service.js"))

// const Tab = createMaterialBottomTabNavigator()
const Tab = createBottomTabNavigator()
// const FirstScreenNavigator = () => {
function FirstScreenNavigator() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [showSettings, setShowSettings] = React.useState(true)
    const insets = useSafeAreaInsets()

    useEffect(() => {
        const checkLogin = async () => {
            const email = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")

            if (email && password) {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user
                    })
                    .catch((error) => {
                        const errorCode = error.code
                        const errorMessage = error.message
                    })
            } else {
            }
        }
        checkLogin()
    }, [])

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const tempColorMode = await AsyncStorage.getItem("storedColorMode")
        if (tempColorMode === "dark" && colorMode === "light") {
            toggleColorMode()
        }
    }

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: useColorModeValue("white", "purple"),
                    borderTopColor: useColorModeValue("gray.200", "black"),
                    borderTopWidth: 4,
                    paddingBottom: insets.bottom,
                    height: 60 + insets.bottom,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline"
                    } else if (route.name === "Library") {
                        iconName = focused ? "book" : "book-outline"
                    } else if (route.name === "Timer") {
                        iconName = focused ? "timer" : "timer-outline"
                    } else if (route.name === "Settings") {
                        iconName = focused ? "cog" : "cog-outline"
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={25} color={useColorModeValue("black", "white")} />
                },
                tabBarActiveTintColor: useColorModeValue("black", "white"),
                tabBarInactiveTintColor: "grey",
            })}>
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                // options={{
                //     tabBarIcon: ({ color }) => <Icon as={FontAwesome} name="book" size={6} color={useColorModeValue("black", "white")} />,
                // }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                // options={{
                //     tabBarIcon: ({ color }) => <Icon as={FontAwesome} name="home" size={6} color={useColorModeValue("black", "white")} />,
                // }}
            />
            <Tab.Screen
                name="Timer"
                component={ShopScreen}
                // options={{
                //     tabBarIcon: ({ color }) => <Icon as={FontAwesome} name="money" size={6} color={useColorModeValue("black", "white")} />,
                // }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                // options={{
                //     tabBarIcon: ({ color }) => <Icon as={FontAwesome} name="cog" size={6} color={useColorModeValue("black", "white")} />,
                // }}
            />
        </Tab.Navigator>
    )
}

// const LoginScreenNavigator = () => {
function LoginScreenNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            // initialRouteName="Login"
        >
            <Tab.Screen name="Login" component={OptionsScreen} />
        </Tab.Navigator>
    )
}

// const AppNavigator = () => {
function AppNavigator(props) {
    const navigation = useNavigation()

    useEffect(() => {
        if (props.isLoggedIn === "true") {
            navigation.navigate("FirstStack", { screen: "Home" })
        }
    }, [props.isLoggedIn])

    if (props.isLoggedIn === "true") {
        return (
            <Tab.Navigator initialRouteName="FirstStack" screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
                <Tab.Screen name="LoginStack" component={LoginScreenNavigator} />
                <Tab.Screen name="FirstStack" component={FirstScreenNavigator} />
            </Tab.Navigator>
        )
    } else {
        return (
            <Tab.Navigator initialRouteName="LoginStack" screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
                <Tab.Screen name="LoginStack" component={LoginScreenNavigator} />
                <Tab.Screen name="FirstStack" component={FirstScreenNavigator} />
            </Tab.Navigator>
        )
    }
}

export default AppNavigator
