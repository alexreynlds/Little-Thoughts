// @ts-nocheck
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { auth } from "./firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AppContainer from "./src/components/AppContainer"
import Navigator, { LoginScreenNavigator } from "./src/"
import { AppContext, AppContextType } from "./src/AppContext"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { useColorMode } from "native-base"

const Stack = createNativeStackNavigator()

export default function App() {
    const { colorMode, toggleColorMode } = useColorMode()
    const [isLogged, setIsLogged] = useState(false)
    const [coins, setCoins] = useState(0)
    const appContextValue: AppContextType = {
        coins,
        setCoins,
    }

    const _retrieveData = async () => {
        try {
            const data = await AsyncStorage.getItem("keepLoggedIn")
            setIsLogged(data)
            if (data) {
                const email = await AsyncStorage.getItem("email")
                const password = await AsyncStorage.getItem("password")
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user
                        return true
                    })
                    .catch((error) => {
                        const errorCode = error.code
                        const errorMessage = error.message
                    })
            } else {
                console.log("unepic")
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        _retrieveData()
    }, [])

    return (
        <AppContext.Provider value={appContextValue}>
            <AppContainer>
                <NavigationContainer>
                    <Navigator isLoggedIn={isLogged} />
                </NavigationContainer>
            </AppContainer>
        </AppContext.Provider>
    )
}
