// @ts-nocheck
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation, useFocusEffect, useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState, useContext } from "react"
import { auth } from "../../firebase"
import { Container, KeyboardAvoidingView, Text, Input, Button, Box, Center, Heading, useColorModeValue } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { AppContext, AppContextType } from "../AppContext"
import Toast from "react-native-toast-message"
import { Ionicons } from "@expo/vector-icons"
import dayjs from "dayjs"
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = () => {
    const isFocused = useIsFocused()
    const { coins, setCoins } = useContext(AppContext)
    const Navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const [username, setUsername] = useState("")

    // Clock information
    const [date, setDate] = useState(dayjs())

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(dayjs())
        }, 1000 * 1)

        return () => clearInterval(interval)
    }, [])

    return (
        <Center style={styles.masterContainer} bg={useColorModeValue("primary.50", "primary.900")} safeArea>
            <Center bgColor="rgba(0, 0, 0, 0.5)" top={"70px"} w={300} borderRadius={40} p={4}>
                <Text fontSize={20} fontWeight={500}>
                    {date.format("dddd, DD MMMM")}
                </Text>
                <Text fontSize={60} fontWeight={"bold"}>
                    {date.format("HH:mm")}
                </Text>
                {/* Icons and text that changes depending on the time of day */}
                <Ionicons name={date.hour() >= 6 && date.hour() < 18 ? "sunny-outline" : "moon-outline"} size={50} color={"white"} position={"absolute"} right={20} />
                <Text>
                    {date.hour() >= 6 && date.hour() < 12 && `Good morning, ${auth.currentUser?.displayName}`}
                    {date.hour() >= 12 && date.hour() < 18 && `Good afternoon, ${auth.currentUser?.displayName}`}
                    {date.hour() >= 18 || (date.hour() < 6 && `Good evening, ${auth.currentUser?.displayName}`)}
                </Text>
            </Center>
            <View>
                <Center p={5} h="100%">
                    <Text>email: {auth.currentUser?.email}</Text>
                </Center>
            </View>
        </Center>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    masterContainer: {
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
    },
    date: {
        color: "#C3FFFE",
        fontSize: 20,
        marginTop: 20,
    },
    time: {
        fontSize: 40,
    },
})
