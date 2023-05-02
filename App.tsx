// @ts-nocheck
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NativeBaseProvider } from "native-base"
import { auth } from "./firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AppContainer from "./src/components/AppContainer"
import Navigator from "./src/"
import { useNavigation } from "@react-navigation/native"

const Stack = createNativeStackNavigator()

export default function App() {
    useEffect(() => {
        const checkLogin = async () => {
            const email = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")

            if (email && password) {
                // console.log("we have both email and password")
                signInWithEmailAndPassword(auth, email, password, true)
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

    return (
        // <NativeBaseProvider>
        //     <NavigationContainer>
        //         <Stack.Navigator>
        //             <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        //             <Stack.Screen name="Home" component={HomeScreen} />
        //         </Stack.Navigator>
        //     </NavigationContainer>
        // </NativeBaseProvider>
        <AppContainer>
            <Navigator />
        </AppContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
})
