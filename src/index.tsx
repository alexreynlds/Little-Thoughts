import React from "react"
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { FontAwesome } from "@expo/vector-icons"
import { useColorModeValue, Icon } from "native-base"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import { NavigationContainer } from "@react-navigation/native"
import { auth } from "../firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

const Tab = createMaterialBottomTabNavigator()

const App = () => {
    useEffect(() => {
        const checkLogin = async () => {
            const email = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")

            if (email && password) {
                // console.log("we have both email and password")
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user
                    })
                    .catch((error) => {
                        const errorCode = error.code
                        const errorMessage = error.message
                    })
            } else {
                console.log("we have no email and password")
            }
        }
        checkLogin()
    }, [])

    const showLogin = false
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Login" backBehavior="history" activeColor="#f0edf6" inactiveColor="grey" barStyle={{ backgroundColor: "#694fad" }} shifting={true} labeled={true}>
                {/* <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Icon as={FontAwesome} name="cog" size={6} color={useColorModeValue("black", "white")} />,
                    }}
                /> */}
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Icon as={FontAwesome} name="cog" size={6} color={useColorModeValue("black", "white")} />,
                    }}
                />
                <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Icon as={FontAwesome} name="cog" size={6} color={useColorModeValue("black", "white")} />,
                    }}
                />
                {/* <Tab.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        unmountOnBlur: true,
                    }}
                /> */}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App
