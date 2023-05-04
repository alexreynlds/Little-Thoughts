// @ts-nocheck
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native"
import { FlatList } from "native-base"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Audio } from "expo-av"

const { height, width } = Dimensions.get("window")

const MusicListItem = ({ item, index, data }) => {
    const [isPlaying, setIsPlaying] = useState(false)

    async function playSound() {
        console.log("Loading Sound")
        const { sound } = await Audio.Sound.createAsync(item.song)

        // Get the status of the sound
        const status = await sound.getStatusAsync()

        // If the sound is currently playing, stop it before playing the new sound
        if (status.isPlaying) {
            console.log("Stopping currently playing sound")
            await sound.stopAsync()
        }

        // Play the new sound
        console.log("Playing Sound")
        await sound.playAsync()
    }

    return (
        <View style={[styles.container, { marginBottom: index == data.length - 1 ? 30 : 0 }]}>
            <Image source={item.image} style={styles.songImage} />
            <View style={styles.nameView}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
            </View>
            <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={30} color="black" style={styles.playButton} onPress={playSound} />
        </View>
    )
}

export default MusicListItem

const styles = StyleSheet.create({
    container: {
        width: width - 70,
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
    },
})
