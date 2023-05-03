// @ts-nocheck
import React, { useEffect, useState } from "react"
import { Text, Box, VStack, Heading, useColorModeValue, View, Center, FormControl, Input, Button, ScrollView, Hidden, Select, TextArea } from "native-base"
import { useColorMode } from "native-base"
import { auth, db } from "../../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth"
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native"
import { doc, getDoc, setDoc, addDoc, collection, query, orderBy, onSnapshot, deleteDoc, Timestamp } from "firebase/firestore"
import { serverTimestamp } from "firebase/firestore"
import { format } from "date-fns"

const LibraryScreen = () => {
    const [newDiaryEntry, setNewDiaryEntry] = useState({
        title: "",
        rating: "",
        mainText: "",
        createdAt: Timestamp.now().toDate(),
    })
    const [diaryEntires, setDiaryEntries] = useState([])
    const diaryCollectionRef = collection(db, "diaryEntries", auth.currentUser.uid, "entries")

    const handleChange = (value, key) => {
        setNewDiaryEntry((prevState) => ({ ...prevState, [key]: value }))
    }

    const getDiaryDate = async () => {
        try {
            const dbRef = doc(db, "diaryEntries", auth.currentUser.uid, "entries")
            const docSnap = await getDoc(dbRef)
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data())
                return docSnap.data()
            } else {
                console.log("No such document!")
            }
        } catch (error) {
            console.error("Error getting document:", error)
        }
    }

    const handleDeleteDiaryEntry = async (id) => {
        try {
            const dbRef = doc(db, "diaryEntries", auth.currentUser.uid, "entries", id)
            await deleteDoc(dbRef)
            console.log("Diary entry deleted!")
        } catch (error) {
            console.error("Error deleting diary entry:", error)
        }
    }

    const handleCreateDiaryEntry = async () => {
        try {
            Keyboard.dismiss()
            const dbRef = collection(db, "diaryEntries", auth.currentUser.uid, "entries")
            await addDoc(dbRef, newDiaryEntry)
            console.log("Diary entry created!")
        } catch (error) {
            console.error("Error creating diary entry:", error)
        }
    }

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
        <View style={styles.container} safeArea bg={useColorModeValue("primary.50", "primary.900")}>
            <VStack style={styles.container} space={15}>
                <Center style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View w={"90%"} p={0} rounded="2xl" mt={10}>
                            <Heading mb={1} fontSize="4xl" color={useColorModeValue("black", "white")} textAlign={"center"}>
                                <Text underline>Library</Text>
                            </Heading>
                            <Center>
                                <Heading size={"md"}>New Entry</Heading>
                                <FormControl>
                                    <FormControl.Label>Title</FormControl.Label>
                                    <Input placeholder="Title" type="text" onChangeText={(text) => handleChange(text, "title")} h="50px" bgColor={useColorModeValue("dark.100", "dark.600")} color="white" fontSize={"xl"} borderRadius={15} />
                                    <FormControl.Label>Rating</FormControl.Label>
                                    {/* <Input placeholder="Rating" type="text" onChangeText={(text) => handleChange(text, "rating")} h="50px" bgColor="dark.100" color="white" fontSize={"xl"} borderRadius={15} /> */}
                                    <Select placeholder="Rating" type="text" h="50px" onValueChange={(itemValue) => handleChange(itemValue, "rating")} bgColor={useColorModeValue("dark.100", "dark.600")} color="white" fontSize={"xl"} borderRadius={15}>
                                        <Select.Item label="1 - very good" value="very good" />
                                        <Select.Item label="2 - good" value="good" />
                                        <Select.Item label="3 - alright" value="alright" />
                                        <Select.Item label="4 - bad" value="bad" />
                                        <Select.Item label="5 - very bad" value="very bad" />
                                    </Select>
                                    <FormControl.Label>Main</FormControl.Label>
                                    <TextArea placeholder="Main" type="text" onChangeText={(text) => handleChange(text, "mainText")} h={20} bgColor={useColorModeValue("dark.100", "dark.600")} color="white" fontSize={"xl"} borderRadius={15} />
                                    <Button onPress={handleCreateDiaryEntry} mt={2}>
                                        Submit
                                    </Button>
                                </FormControl>
                            </Center>
                        </View>
                    </TouchableWithoutFeedback>
                </Center>
                <Center style={styles.container} mt={10}>
                    <ScrollView w={"100%"}>
                        <Heading size={"md"}>Past Entries</Heading>
                        {diaryEntires.length === 0 ? (
                            <Text>No entries yet!</Text>
                        ) : (
                            diaryEntires.map((entry) => (
                                <Box key={entry.id} bg={useColorModeValue("white", "gray.700")} shadow={1} rounded="lg" width="100%" p={2} _text={{ color: "black" }} my={2} p={5}>
                                    <Text fontSize={"2xl"}>{entry.title}</Text>
                                    <Text>{format(entry.createdAt.toDate(), "dd MMM yyyy")}</Text>
                                    <Text>Emotionally: {entry.rating}</Text>
                                    <Text mt={3}>{entry.mainText}</Text>
                                    <Button position={"absolute"} right="0" m={2} onPress={() => handleDeleteDiaryEntry(entry.id)} bgColor="red.600">
                                        Delete
                                    </Button>
                                </Box>
                            ))
                        )}
                    </ScrollView>
                </Center>
            </VStack>
        </View>
    )
}

export default LibraryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
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
