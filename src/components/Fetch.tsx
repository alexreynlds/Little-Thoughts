// @ts-nocheck
import { Text, Box, VStack, Heading, useColorModeValue, View, Center, FormControl, Input, Button, ScrollView, Modal, Pressable, Select, TextArea, Image, FlatList, stylingProps } from "native-base"
import React, { useEffect, useState } from "react"
import { auth, db } from "../../firebase"
import { StyleSheet } from "react-native"
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"

const Fetch = () => {
    const [diaryEntries, setDiaryEntries] = useState([])
    const diaryCollectionRef = collection(db, "diaryEntries", auth.currentUser.uid, "entries")

    useEffect(() => {
        const q = query(diaryCollectionRef, orderBy("createdAt", "desc"))
        onSnapshot(q, (snapshot) => {
            const diaryEntry = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setDiaryEntries(diaryEntry)
        })
    }, [])

    return (
        <View style={{ flex: 1, marginTop: 100 }} bgColor="amber.200">
            <FlatList
                style={{ height: "100%" }}
                data={diaryEntries}
                numcolumns={1}
                renderItem={({ item }) => (
                    <Pressable style={styles.container}>
                        <View style={styles.innerContainer}>
                            <Text>{item.title}</Text>
                            <Text>{item.rating}</Text>
                            <Text>{item.mainText}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

export default Fetch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea",
    },
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        margin: 10,
    },
})
