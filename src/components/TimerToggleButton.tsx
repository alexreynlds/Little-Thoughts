import React from "react"
import { Text, View, Button, Pressable } from "native-base"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet } from "react-native"

type Props = {
    timerIsRunning: boolean
    startTimer: () => void
    stopTimer: () => void
}

export const TimerToggleButton: React.FC<Props> = ({ timerIsRunning, stopTimer, startTimer }) => {
    return (
        <Pressable onPress={timerIsRunning ? stopTimer : startTimer}>
            <View style={styles.container}>
                <Ionicons style={styles.icon} name={timerIsRunning ? "stop" : "play"} size={82} color="black" />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: "center",
        color: "white",
    },
    container: {
        marginVertical: 20,
        borderWidth: 5,
        width: 250,
        height: 250,
        borderRadius: 250,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "white",
    },
})
