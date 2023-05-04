// @ts-nocheck
import { StyleSheet, TouchableOpacity, View, ImageBackground } from "react-native"
import { useNavigation, useFocusEffect, useIsFocused, Dimensions, Window } from "@react-navigation/native"
import React, { useEffect, useState, useContext } from "react"
import { auth } from "../../firebase"
import { Container, KeyboardAvoidingView, Text, Input, Button, Box, Center, Modal, useColorModeValue, FlatList, ScrollView, Image } from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { AppContext, AppContextType } from "../AppContext"
import Toast from "react-native-toast-message"
import { Ionicons } from "@expo/vector-icons"
import dayjs from "dayjs"
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context"
import testWallpaper from "../assets/test.gif"
import { Audio } from "expo-av"
import { songs } from "../MusicData"
import MusicListItem from "../components/MusicListItem"
// https://giphy.com/explore/ixelart

const HomeScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const isFocused = useIsFocused()
    const { coins, setCoins } = useContext(AppContext)
    const [isRadioVisibile, setIsRadioVisibile] = useState(false)
    const [index, setIndex] = useState(0)
    // Clock information
    const [date, setDate] = useState(dayjs())

    // Audio stuff
    const [sound, setSound] = useState()

    const playSound = async (item, index) => {
        try {
            if (sound) {
                await sound.unloadAsync()
            }
            const { sound: audio } = await Audio.Sound.createAsync(item.song, { shouldPlay: true }, onPlaybackStatusUpdate)
            setSound(audio)
            setIsPlaying(true)

            function onPlaybackStatusUpdate(status) {
                if (status.didJustFinish) {
                    // If the current song is done playing, switch to the next song
                    setIndex(index + 1)
                    if (index + 1 < songs.length) {
                        const nextSong = songs[index + 1]
                        console.log(nextSong.name)
                        playSound(nextSong.song, index + 1)
                    } else {
                        setIsPlaying(false)
                    }
                }
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync()
            setIsPlaying(false)
        }
    }

    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync()
            setIsPlaying(false)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(dayjs())
        }, 1000 * 1)

        return () => clearInterval(interval)
    }, [])

    return (
        <ImageBackground source={testWallpaper} style={StyleSheet.absoluteFill}>
            <Center style={styles.masterContainer} safeArea>
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
                <Center p={5} h="100%">
                    <Button left={"110px"} top={"90px"} width={20} height={20} onPress={() => setIsRadioVisibile(true)} backgroundColor={"rgba(52, 52, 52, 0.1)"}></Button>

                    <Modal isOpen={isRadioVisibile} onClose={() => setIsRadioVisibile(false)}>
                        <Modal.Content w="100%">
                            <Modal.CloseButton />
                            <Modal.Header>Radio!</Modal.Header>
                            <Modal.Body>
                                <View flex={1}>
                                    <FlatList
                                        data={songs}
                                        renderItem={({ item, index }) => (
                                            <View style={[styles.musicContainer, { marginBottom: index == songs.length - 1 ? 30 : 0 }]}>
                                                <Image source={item.image} style={styles.songImage} alt="Music Player Image" />
                                                <View style={styles.nameView}>
                                                    <Text style={styles.name}>{item.title}</Text>
                                                    <Text style={styles.artist}>{item.artist}</Text>
                                                </View>
                                                <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={30} color="black" style={styles.playButton} onPress={() => (isPlaying ? pauseSound() : playSound(item, index))} />
                                            </View>
                                        )}
                                    />
                                </View>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                </Center>
            </Center>
        </ImageBackground>
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
    musicContainer: {
        width: -70,
        height: 70,
        elevation: 5,
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "white",
        borderColor: "white",

        borderRadius: 7,
        flexDirection: "row",
        alignItems: "center",
    },
    songImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginLeft: 5,
    },
    nameView: {
        width: "65%",
        marginLeft: 10,
    },
    name: {
        fontSize: 17,
        fontWeight: 700,
        color: "black",
    },
    artist: {
        fontSize: 14,
        fontWeight: 500,
        color: "black",
        marginTop: 3,
    },
    playButton: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
})
