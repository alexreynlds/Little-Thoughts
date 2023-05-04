import React from "react"
import { Text, View, StyleSheet } from "react-native"

type Props = {
    timerDate: Date
}

export const TimerCountdownDisplay: React.FC<Props> = ({ timerDate }) => {
    return (
        <View>
            <Text style={styles.timerText}>
                {timerDate.getMinutes().toString().padStart(2, "0")}:{timerDate.getSeconds().toString().padStart(2, "0")}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    timerText: {
        color: "white",
        fontSize: 60,
    },
})
