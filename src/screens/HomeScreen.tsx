// @ts-nocheck
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation, useFocusEffect, useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState, useContext } from "react"
import { auth } from "../../firebase"
import { Container, KeyboardAvoidingView, Text, Input, Button, Box, Center, Heading, useColorModeValue } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { AppContext, AppContextType } from "../AppContext"
// import { Canvas } from "@react-three/fiber"

const HomeScreen = () => {
    const isFocused = useIsFocused()
    const { coins, setCoins } = useContext(AppContext)
    const Navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")

    const getUsername = () => {
        AsyncStorage.getItem("username").then((value) => {
            setUsername(value)
        })
    }

    useEffect(() => {
        const getUsername = async () => {
            const username = await AsyncStorage.getItem("username")
            setUsername(username)
        }
        getUsername()

        setUser(auth.currentUser)
    }, [isFocused])

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

    return (
        <Box safeArea bg={useColorModeValue("primary.50", "primary.900")}>
            <View>
                <Box></Box>
                <Center p={5} h="100%">
                    <Heading size="xl" mb={20}>
                        Welcome back: {username}!
                    </Heading>
                    <Text>email: {auth.currentUser?.email}</Text>
                    {/* <Canvas></Canvas> */}
                </Center>
            </View>
        </Box>
    )
}

export default HomeScreen
