// @ts-nocheck
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { auth, db } from "../../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Container, KeyboardAvoidingView, Text, Input, Button, Box, Center, View, Heading, HStack, VStack, useColorModeValue, Slider, FormControl, useColorMode, TouchableWit } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context"
import ThemeToggle from "../components/ThemeToggle"
import Toast from "react-native-toast-message"

const SettingsScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const navigation = useNavigation()

    const insets = useSafeAreaInsets()

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

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                AsyncStorage.removeItem("email")
                AsyncStorage.removeItem("password")
                AsyncStorage.removeItem("keepLoggedIn")
                // navigation.navigate("Home")
                navigation.navigate("LoginStack", { screen: "Login" })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const doTest = async () => {
        const result = await AsyncStorage.getItem("storedColorMode")
        console.log(result)
    }

    const updateUsername = async () => {
        const user = auth.currentUser
        await updateProfile(user, { displayName: newUsername })
        console.log(user?.displayName)
    }

    const changeUsername = () => {
        const user = auth.currentUser
        const docRef = doc(db, "users", user.uid)
        setDoc(docRef, { username: newUsername }, { merge: true })
            .then(() => {
                console.log("Document successfully written!")
                AsyncStorage.setItem("username", newUsername)
                Toast.show({
                    type: "success",
                    text1: "Username changed!",
                    text2: "Your username has been changed successfully!",
                })
            })
            .catch((error) => {
                console.error("Error writing document: ", error)
                Toast.show({
                    type: "error",
                    text1: "Error changing username!",
                    text2: "There was an error changing your username. Please try again.",
                })
            })
        updateUsername()
        Keyboard.dismiss()
    }

    return (
        // SHOWN WHEN USER IS LOGGED IN
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Box style={styles.container} safeArea bg={useColorModeValue("primary.50", "primary.900")}>
                <View style={styles.contentContainer} w={"90%"} p={10} rounded="2xl" mt={10} shadow={useColorModeValue("", "3")} borderWidth={5}>
                    <Heading mb={5} fontSize="4xl" color={useColorModeValue("black", "white")} textAlign={"center"}>
                        <Text underline>Settings</Text>
                    </Heading>
                    <VStack space={5} height="80%">
                        <Center>
                            <FormControl>
                                <FormControl.Label mt={2}>Change Username</FormControl.Label>
                                <Input placeholder="Username" type="text" value={newUsername} onChangeText={(text) => setNewUsername(text)} h="50px" my={2} bgColor={useColorModeValue("dark.600", "dark.600")} color="black" fontSize={"xl"} borderRadius={15} />
                                <Button onPress={changeUsername}>
                                    <Text>Change Username</Text>
                                </Button>
                            </FormControl>
                        </Center>
                        <Center>
                            <Text fontSize="xl" mb={5}>
                                Toggle Theme
                            </Text>
                            <ThemeToggle />
                        </Center>
                        <Center flex={"1"} justifyContent={"flex-end"}>
                            <Button onPress={handleLogout} width={150} bg={"red.600"}>
                                <Text fontWeight={"bold"} fontSize={"md"}>
                                    Logout
                                </Text>
                            </Button>
                        </Center>
                    </VStack>
                </View>
            </Box>
        </TouchableWithoutFeedback>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
    },
    contentContainer: {
        flex: 1,
        // backgroundColor: "red",
    },
    footer: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "flex-end",
        height: 100,
    },
})
