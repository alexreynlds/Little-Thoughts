// @ts-nocheck
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState, useContext } from "react"
import { auth } from "../../firebase"
import LoginScreen from "./LoginScreen"
import { Container, KeyboardAvoidingView, Text, Input, Button, Box, Center, Header } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppContext, AppContextType } from "../AppContext"

const HomeScreen = () => {
    const { canSeeLogin, setCanSeeLogin } = useContext(AppContext)
    const { coins, setCoins } = useContext(AppContext)
    const Navigation = useNavigation()

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                AsyncStorage.removeItem("email")
                AsyncStorage.removeItem("password")
                Navigation.navigate("Login")
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <Center p={20} bgColor="blue.100" h="100%">
            <Text>Email: {auth.currentUser?.email}</Text>
            <Button onPress={handleLogout}>
                <Text>Logout</Text>
            </Button>
            <Text>Coins: {coins}</Text>
        </Center>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#2B3e49",
        width: "50%",
        marginTop: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})
