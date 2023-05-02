// @ts-nocheck
// import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { StyleSheet, Keyboard } from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { auth } from "../../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Container, KeyboardAvoidingView, Text, Input, Button, Box, Center, View, Header } from "native-base"
import { AppContext, AppContextType } from "../AppContext"
import { useFocusEffect } from "@react-navigation/native"

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [canSeeLogin, setCanSeeLogin] = useState("yes")
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("Home")
            } else {
            }
        })

        return () => unsubscribe()
    }, [auth, navigation])

    useFocusEffect(
        React.useCallback(() => {
            checkAuth()
                .then((isAuthenticated) => {
                    // update component state here
                    if (isAuthenticated) {
                        setCanSeeLogin("no")
                    } else {
                        setCanSeeLogin("yes")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    // handle error here
                })
        }, [])
    )

    function checkAuth() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(
                auth,
                (user) => {
                    if (user) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                },
                reject
            )
        })
    }

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("Registered with: ", user.email)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage)
            })
    }

    const handleLogin = () => {
        Keyboard.dismiss()
        signInWithEmailAndPassword(auth, email, password, true)
            .then((userCredential) => {
                const user = userCredential.user
                AsyncStorage.setItem("email", email)
                AsyncStorage.setItem("password", password)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage)
            })
    }

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                AsyncStorage.removeItem("email")
                AsyncStorage.removeItem("password")
                navigation.navigate("Home")
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <Center flex={1} w={"100%"}>
            {canSeeLogin === "yes" ? (
                <KeyboardAvoidingView flex={1} alignItems="center" justifyContent="center" behavior="padding" bgColor="#2b3e49" w={"100%"}>
                    <Text color="white" fontWeight="bold" fontSize="xl" textAlign={"center"} mb={3}>
                        Account Login
                    </Text>
                    <Box w="80%" alignItems="center">
                        <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text.toLowerCase())} h="50px" my={2} bgColor="dark.100" color="white" fontSize={"xl"} borderRadius={15} />
                        <Input placeholder="Password" type="password" value={password} onChangeText={(text) => setPassword(text)} h="50px" my={2} bgColor="dark.100" color="white" fontSize={"xl"} borderRadius={15} />
                    </Box>
                    <Box w="225px" mt={10}>
                        <Button my={2} onPress={handleLogin}>
                            <Text color="white" fontWeight="bold" fontSize="20">
                                Login
                            </Text>
                        </Button>
                        <Button my={2} onPress={handleRegister}>
                            <Text color="white" fontWeight="bold" fontSize="20">
                                Register
                            </Text>
                        </Button>
                    </Box>
                </KeyboardAvoidingView>
            ) : (
                // SHOWN WHEN USER IS LOGGED IN
                <KeyboardAvoidingView flex={1} alignItems="center" justifyContent="center" behavior="padding" bgColor="#2b3e49" w={"100%"}>
                    <Text color="white" fontWeight="bold" fontSize="xl" textAlign={"center"} mb={3}>
                        Settings
                    </Text>
                    <Button onPress={handleLogout}>
                        <Text>Logout</Text>
                    </Button>
                </KeyboardAvoidingView>
            )}
        </Center>
    )
}

export default LoginScreen
