// @ts-nocheck
import { StyleSheet, Keyboard } from "react-native"
import React, { useState, useEffect, useContext } from "react"
import { auth, db } from "../../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Container, KeyboardAvoidingView, Text, Input, Button, Box, Center, View, Heading, HStack, VStack, useColorModeValue, Slider, FormControl, useColorMode } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context"
import ThemeToggle from "../components/ThemeToggle"

const LoginScreen = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [canSeeLogin, setCanSeeLogin] = useState("yes")
    const [newUsername, setNewUsername] = useState("")
    const navigation = useNavigation()

    const insets = useSafeAreaInsets()

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const docRef = doc(db, "users", user.uid)
    //             getDoc(docRef)
    //                 .then((docSnap) => {
    //                     if (docSnap.exists()) {
    //                         const data = docSnap.data()
    //                         AsyncStorage.setItem("username", data.username)
    //                     } else {
    //                         console.log("No such document!")
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.log("Error getting document:", error)
    //                     AsyncStorage.setItem("username", "User")
    //                 })

    //             navigation.navigate("Home")
    //         }
    //     })

    //     return unsubscribe
    // }, [auth, navigation, handleLogin, handleRegister])

    useEffect(() => {
        const getColorMode = async () => {
            const colorMode = await AsyncStorage.getItem("colorMode")
            if (colorMode == "dark") {
                toggleColorMode()
            }
        }
        getColorMode()
    }, [])

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
                return setDoc(doc(db, "users", userCredential.user.uid), {
                    email: userCredential.user.email,
                    username: userCredential.user.email.split("@")[0],
                    createdAt: new Date(),
                    coins: 0,
                }).then(() => {
                    // navigation.navigate("Home")
                })
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
                AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true))
                AsyncStorage.setItem("email", email)
                AsyncStorage.setItem("password", password)
                navigation.navigate("FirstStack", { screen: "Home" })
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
                navigation.navigate("LoginStack", { screen: "Login" })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const changeUsername = () => {
        const user = auth.currentUser
        const docRef = doc(db, "users", user.uid)
        setDoc(docRef, { username: newUsername }, { merge: true })
            .then(() => {
                console.log("Document successfully written!")
                AsyncStorage.setItem("username", newUsername)
            })
            .catch((error) => {
                console.error("Error writing document: ", error)
            })
        Keyboard.dismiss()
    }

    const doTest = () => {}

    return (
        <Center flex={1} w={"100%"}>
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
        </Center>
    )
}

export default LoginScreen

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
