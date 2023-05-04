// @ts-nocheck
import { auth } from "./firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import React, { useState, useEffect, Component } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AppContainer from "./src/components/AppContainer"
import Navigator, { LoginScreenNavigator } from "./index"
import { AppContext, AppContextType } from "./src/AppContext"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { useColorMode } from "native-base"
import Toast from "react-native-toast-message"
import { Audio } from "expo-av"

export default function App() {
    // const setAudioMode = async () => {
    //     await Audio.setAudioModeAsync({
    //         staysActiveInBackground: true,
    //         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    //         shouldDuckAndroid: true,
    //         playThroughEarpieceAndroid: true,
    //         allowsRecordingIOS: true,
    //         playsInSilentModeIOS: true,
    //     })
    // }

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
                        Toast.show({
                            type: "success",
                            text1: "Successfully Logged In!",
                            text2: "Welcome back!",
                        })
                        const user = userCredential.user
                        return true
                    })
                    .catch((error) => {
                        const errorCode = error.code
                        const errorMessage = error.message
                    })
            } else {
                return false
            }
        } catch (error) {}
    }

    useEffect(() => {
        // setAudioMode()
        _retrieveData()
    }, [])

    return (
        <AppContext.Provider value={appContextValue}>
            <AppContainer>
                <NavigationContainer>
                    <Navigator isLoggedIn={isLogged} />
                    <Toast />
                </NavigationContainer>
            </AppContainer>
        </AppContext.Provider>
    )
}
