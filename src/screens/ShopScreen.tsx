import React, { useContext, useState, useEffect } from "react"
import { Text, Heading, useColorModeValue, View, Center, Button } from "native-base"
import { StyleSheet } from "react-native"
import { AppContext, AppContextType } from "../AppContext"
import { useColorMode } from "native-base"
import { auth } from "../../firebase"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TimerCountdownDisplay } from "../components/TimerDisplay"
import { TimerToggleButton } from "../components/TimerToggleButton"

const POMODORO_TIME_MINUTES = 25 * 60 * 1000 // 25 minutes
const BREAK_TIME_MINUTES = 5 * 60 * 1000

const ShopScreen = () => {
    const [timerCount, setTimerCount] = useState<number>(POMODORO_TIME_MINUTES)
    const [timerInterval, setTimerInterval] = useState<any>(null)
    const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false)
    const [timerMode, setTimerMode] = useState<"pomodoro" | "break">("pomodoro")

    useEffect(() => {
        if (timerCount == 0) {
            if (timerMode === "pomodoro") {
                setTimerCount(BREAK_TIME_MINUTES)
                setTimerMode("break")
            } else {
                setTimerCount(POMODORO_TIME_MINUTES)
                setTimerMode("pomodoro")
            }
            stopTimer()
        }
    }, [timerCount])

    const startTimer = () => {
        const timer = setInterval(() => {
            setTimerCount((prev) => prev - 1000)
        }, 1000)
        setTimerInterval(timer)
        setTimerIsRunning(true)
    }

    const stopTimer = () => {
        if (timerInterval) clearInterval(timerInterval)
        setTimerIsRunning(false)
    }

    const timerDate = new Date(timerCount)

    return (
        <Center safeArea flex={1} style={{ ...styles.container, ...{ backgroundColor: timerMode === "break" ? "#2a9d8f" : "#d95550" } }}>
            <Heading>{timerMode === "pomodoro" ? "Time to focus!" : "Time for a break!"}</Heading>
            <TimerToggleButton timerIsRunning={timerIsRunning} startTimer={startTimer} stopTimer={stopTimer} />
            <TimerCountdownDisplay timerDate={timerDate} />
        </Center>
    )
}

export default ShopScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
